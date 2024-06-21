import QuestionCard from '@/components/cards/QuestionCard';
import HomeFilters from '@/components/Home/HomeFilters';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult/NoResult';
import Pagination from '@/components/shared/Pagination';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import {
	getQuestions,
	getRecommendedQuestions,
} from '@/lib/actions/question.action';
import { SearchParamsProps } from '@/types';
import Link from 'next/link';

import { auth } from '@clerk/nextjs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Домашня сторінка | ITHelps',
};

export default async function Home({ searchParams }: SearchParamsProps) {
	const { userId } = auth();

	let result;

	if (searchParams?.filter === 'recommended') {
		if (userId) {
			result = await getRecommendedQuestions({
				userId,
				searchQuery: searchParams.q,
				page: searchParams.page ? +searchParams.page : 1,
			});
		} else {
			result = {
				questions: [],
				isNext: false,
			};
		}
	} else {
		result = await getQuestions({
			searchQuery: searchParams.q,
			filter: searchParams.filter,
			page: searchParams.page ? +searchParams.page : 1,
		});
	}

	return (
		<>
			<div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
				<h1 className="h1-bold text-dark100_light900">Усі Питання</h1>

				<Link href="/ask-question" className="flex justify-end max-sm:w-full">
					<Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
						Запитай
					</Button>
				</Link>
			</div>

			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
				<LocalSearchbar
					route="/"
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="Знайди те, що тебе цікавить"
					otherClasses="flex-1"
				/>

				<Filter
					filters={HomePageFilters}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
					containerClasses="hidden max-md:flex"
				/>
			</div>

			<HomeFilters />

			<div className="mt-10 flex w-full flex-col gap-6">
				{result.questions.length > 0 ? (
					result.questions.map(question => (
						<QuestionCard
							key={question._id}
							_id={question._id}
							title={question.title}
							tags={question.tags}
							author={question.author}
							upvotes={question.upvotes}
							views={question.views}
							answers={question.answers}
							createdAt={question.createdAt}
						/>
					))
				) : (
					<NoResult
						title="Немає питань для відображення"
						description="Не будьмо мовчунами! 🚀 Запитай щось та розпочни обговорення. Твоє питання може стати чимось важливим, чого навчаться інші. Долучайся! 💡"
						link="/ask-question"
						linkTitle="Запитай"
					/>
				)}
			</div>
			<div className="mt-10">
				<Pagination
					pageNumber={searchParams?.page ? +searchParams.page : 1}
					isNext={result.isNext}
				/>
			</div>
		</>
	);
}
