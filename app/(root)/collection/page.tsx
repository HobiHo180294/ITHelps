import QuestionCard from '@/components/cards/QuestionCard';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import Pagination from '@/components/shared/Pagination';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { QuestionFilters } from '@/constants/filters';
import { getSavedQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Колекція | ITHelps',
};

export default async function Home({ searchParams }: SearchParamsProps) {
	const { userId } = auth();

	if (!userId) return null;

	const result = await getSavedQuestions({
		clerkId: userId,
		searchQuery: searchParams.q,
		filter: searchParams.filter,
		page: searchParams.page ? +searchParams.page : 1,
	});

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">Збережені Питання</h1>

			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
				<LocalSearchbar
					route="/"
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="Знайди щось важливе"
					otherClasses="flex-1"
				/>

				<Filter
					filters={QuestionFilters}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
				/>
			</div>

			<div className="mt-10 flex w-full flex-col gap-6">
				{result.questions.length > 0 ? (
					result.questions.map((question: any) => (
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
