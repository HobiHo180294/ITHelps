import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

const Loading = () => {
	return (
		<section className="relative">
			<div className="absolute inset-0 flex items-start justify-center bg-background/50 z-10 pt-20 sm:pt-32">
				<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary sm:h-24 sm:w-24 md:h-32 md:w-32">
					<span className="sr-only">Завантаження...</span>
				</div>
			</div>

			<div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
				<h1 className="h1-bold text-dark100_light900">Усі Питання</h1>

				<Link href="/ask-question" className="flex justify-end max-sm:w-full">
					<Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
						Запитай
					</Button>
				</Link>
			</div>

			<div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
				<Skeleton className="h-14 flex-1" />
				<div className="hidden max-md:block">
					<Skeleton className="h-14 w-28" />
				</div>
			</div>

			<div className="my-10 hidden flex-wrap gap-6 md:flex">
				<Skeleton className="h-9 w-40" />
				<Skeleton className="h-9 w-40" />
				<Skeleton className="h-9 w-40" />
				<Skeleton className="h-9 w-40" />
			</div>

			<div className="flex flex-col gap-6">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
					<Skeleton key={item} className="h-48 w-full rounded-xl" />
				))}
			</div>
		</section>
	);
};

export default Loading;
