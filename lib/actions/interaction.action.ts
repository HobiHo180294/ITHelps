'use server';

import Interaction from '@/database/interaction.model';
import Question from '@/database/question.model';
import { establishDBConnection } from '../mongoose';
import { ViewQuestionParams } from './shared.types';

export async function viewQuestion(params: ViewQuestionParams) {
	try {
		await establishDBConnection();

		const { questionId, userId } = params;

		await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

		if (userId) {
			const existingInteraction = await Interaction.findOne({
				user: userId,
				action: 'view',
				question: questionId,
			});

			if (existingInteraction) return 'User has already viewed.';

			await Interaction.create({
				user: userId,
				action: 'view',
				question: questionId,
			});
		}
	} catch (error) {
		throw error;
	}
}
