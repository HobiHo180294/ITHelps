'use server';

import Answer from '@/database/answer.model';
import Interaction from '@/database/interaction.model';
import Question from '@/database/question.model';
import Tag from '@/database/tag.model';
import User from '@/database/user.model';
import { FilterQuery } from 'mongoose';
import { revalidatePath } from 'next/cache';
import { establishDBConnection } from '../mongoose';
import {
	DeleteQuestionParams,
	EditQuestionParams,
	GetQuestionByIdParams,
	GetQuestionsParams,
	InquiryParameters,
	QuestionVoteParams,
	RecommendedParams,
} from './shared.types';

const getExistingTag = async (tag: string, question: any) =>
	await Tag.findOneAndUpdate(
		{ name: { $regex: new RegExp(`^${tag}$`, 'i') } },
		{ $setOnInsert: { name: tag }, $push: { questions: question._id } },
		{ upsert: true, new: true }
	);

export async function getQuestions(params: GetQuestionsParams) {
	try {
		establishDBConnection();

		const { searchQuery, filter, page = 1, pageSize = 10 } = params;

		const skipAmount = (page - 1) * pageSize;

		const query: FilterQuery<typeof Question> = {};

		if (searchQuery) {
			query.$or = [
				{ title: { $regex: new RegExp(searchQuery, 'i') } },
				{ content: { $regex: new RegExp(searchQuery, 'i') } },
			];
		}

		let sortOptions = {};

		switch (filter) {
			case 'newest':
				sortOptions = { createdAt: -1 };
				break;
			case 'frequent':
				sortOptions = { views: -1 };
				break;
			case 'unanswered':
				query.answers = { $size: 0 };
				break;
			default:
				break;
		}

		const questions = await Question.find(query)
			.populate({ path: 'tags', model: Tag })
			.populate({ path: 'author', model: User })
			.skip(skipAmount)
			.limit(pageSize)
			.sort(sortOptions);

		const totalQuestions = await Question.countDocuments(query);

		const isNext = totalQuestions > skipAmount + questions.length;

		return { questions, isNext };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function inquire(params: InquiryParameters) {
	try {
		establishDBConnection();
		const { subject, body, tags, creator, route } = params;

		const raisedIssue = await Question.create({
			title: subject,
			content: body,
			author: creator,
		});

		const tagsCollection: string[] = [];

		for (const tag of tags) {
			const retrievedTag = await getExistingTag(tag, raisedIssue);
			tagsCollection.push(retrievedTag._id);
		}

		await Question.findByIdAndUpdate(raisedIssue._id, {
			$push: { tags: { $each: tagsCollection } },
		});

		await Interaction.create({
			user: creator,
			action: 'ask_question',
			question: raisedIssue._id,
			tags: tagsCollection,
		});

		await User.findByIdAndUpdate(creator, { $inc: { reputation: 5 } });

		revalidatePath(route);
	} catch (error) {
		return error;
	}
}

export async function getQuestionById(params: GetQuestionByIdParams) {
	try {
		establishDBConnection();

		const { questionId } = params;

		const question = await Question.findById(questionId)
			.populate({ path: 'tags', model: Tag, select: '_id name' })
			.populate({
				path: 'author',
				model: User,
				select: '_id clerkId name picture',
			});

		return question;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function upvoteQuestion(params: QuestionVoteParams) {
	try {
		establishDBConnection();

		const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

		let updateQuery = {};

		if (hasupVoted) {
			updateQuery = { $pull: { upvotes: userId } };
		} else if (hasdownVoted) {
			updateQuery = {
				$pull: { downvotes: userId },
				$push: { upvotes: userId },
			};
		} else {
			updateQuery = { $addToSet: { upvotes: userId } };
		}

		const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
			new: true,
		});

		if (!question) {
			throw new Error('Question not found');
		}

		await User.findByIdAndUpdate(userId, {
			$inc: { reputation: hasupVoted ? -1 : 1 },
		});

		await User.findByIdAndUpdate(question.author, {
			$inc: { reputation: hasupVoted ? -10 : 10 },
		});

		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function downvoteQuestion(params: QuestionVoteParams) {
	try {
		establishDBConnection();

		const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

		let updateQuery = {};

		if (hasdownVoted) {
			updateQuery = { $pull: { downvote: userId } };
		} else if (hasupVoted) {
			updateQuery = {
				$pull: { upvotes: userId },
				$push: { downvotes: userId },
			};
		} else {
			updateQuery = { $addToSet: { downvotes: userId } };
		}

		const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
			new: true,
		});

		if (!question) {
			throw new Error('Question not found');
		}

		await User.findByIdAndUpdate(userId, {
			$inc: { reputation: hasdownVoted ? -2 : 2 },
		});

		await User.findByIdAndUpdate(question.author, {
			$inc: { reputation: hasdownVoted ? -10 : 10 },
		});

		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function deleteQuestion(params: DeleteQuestionParams) {
	try {
		establishDBConnection();

		const { questionId, path } = params;

		await Question.deleteOne({ _id: questionId });
		await Answer.deleteMany({ question: questionId });
		await Interaction.deleteMany({ question: questionId });
		await Tag.updateMany(
			{ questions: questionId },
			{ $pull: { questions: questionId } }
		);

		revalidatePath(path);
	} catch (error) {
		console.log(error);
	}
}

export async function editQuestion(params: EditQuestionParams) {
	try {
		establishDBConnection();

		const { questionId, title, content, path } = params;

		const question = await Question.findById(questionId).populate('tags');

		if (!question) {
			throw new Error('Question not found');
		}

		question.title = title;
		question.content = content;

		await question.save();

		revalidatePath(path);
	} catch (error) {
		console.log(error);
	}
}

export async function getHotQuestions() {
	try {
		establishDBConnection();

		const hotQuestions = await Question.find({})
			.sort({ views: -1, upvotes: -1 })
			.limit(5);

		return hotQuestions;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getRecommendedQuestions(params: RecommendedParams) {
	try {
		await establishDBConnection();

		const { userId, page = 1, pageSize = 20, searchQuery } = params;

		const user = await User.findOne({ clerkId: userId });

		if (!user) {
			throw new Error('user not found');
		}

		const skipAmount = (page - 1) * pageSize;

		const userInteractions = await Interaction.find({ user: user._id })
			.populate('tags')
			.exec();

		const userTags = userInteractions.reduce((tags, interaction) => {
			if (interaction.tags) {
				tags = tags.concat(interaction.tags);
			}
			return tags;
		}, []);

		const distinctUserTagIds = [
			// @ts-ignore
			...new Set(userTags.map((tag: any) => tag._id)),
		];

		const query: FilterQuery<typeof Question> = {
			$and: [
				{ tags: { $in: distinctUserTagIds } },
				{ author: { $ne: user._id } },
			],
		};

		if (searchQuery) {
			query.$or = [
				{ title: { $regex: searchQuery, $options: 'i' } },
				{ content: { $regex: searchQuery, $options: 'i' } },
			];
		}

		const totalQuestions = await Question.countDocuments(query);

		const recommendedQuestions = await Question.find(query)
			.populate({
				path: 'tags',
				model: Tag,
			})
			.populate({
				path: 'author',
				model: User,
			})
			.skip(skipAmount)
			.limit(pageSize);

		const isNext = totalQuestions > skipAmount + recommendedQuestions.length;

		return { questions: recommendedQuestions, isNext };
	} catch (error) {
		console.error('Error getting recommended questions:', error);
		throw error;
	}
}
