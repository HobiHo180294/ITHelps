import QuestionCard from '@/components/cards/QuestionCard';
import { NoResult, Pagination } from '@/components/shared';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { getQuestionsByTagId } from '@/lib/actions/tag.actions';
import { URLProps } from '@/types';

const Page = async ({ params, searchParams }: URLProps) => {
	const result = await getQuestionsByTagId({
		tagId: params.id,
		page: searchParams.page ? +searchParams.page : 1,
		searchQuery: searchParams.q,
	});

	return (
		<>
			<h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

			<div className="mt-11 w-full">
				<LocalSearchbar
					route={`/tags/${params.id}`}
					iconPosition="left"
					imgSrc="/assets/icons/search.svg"
					placeholder="Знайди потрібне питання за тегом"
					otherClasses="flex-1"
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
						title="Немає збережених запитань за цим тегом"
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
};

export default Page;
