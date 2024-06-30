import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
	return (
		<section className="relative">
			{/* Spinner overlay */}
			{/* <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
				<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary sm:h-24 sm:w-24 md:h-32 md:w-32">
					<span className="sr-only">Loading...</span>
				</div>
			</div> */}

			<div className="absolute inset-0 flex items-start justify-center bg-background/50 z-10 pt-20 sm:pt-32">
				<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary sm:h-24 sm:w-24 md:h-32 md:w-32">
					<span className="sr-only">Loading...</span>
				</div>
			</div>

			<h1 className="h1-bold text-dark100_light900">Усі Користувачі</h1>

			<div className="mb-12 mt-11 flex flex-wrap gap-5">
				<Skeleton className="h-14 flex-1" />
				<Skeleton className="h-14 w-28" />
			</div>

			<div className="flex flex-wrap gap-4">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
					<Skeleton
						key={item}
						className="h-60 w-full rounded-2xl sm:w-[260px]"
					/>
				))}
			</div>
		</section>
	);
};

export default Loading;
