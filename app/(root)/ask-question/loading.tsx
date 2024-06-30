import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
	return (
		<div className="w-full relative">
			<div className="absolute inset-0 flex items-start justify-center bg-background/50 z-10 pt-20 sm:pt-32">
				<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary sm:h-24 sm:w-24 md:h-32 md:w-32">
					<span className="sr-only">Завантаження...</span>
				</div>
			</div>

			<h1 className="h1-bold text-dark100_light900">Запитай</h1>

			<div className="mt-9 w-full">
				<Skeleton className="h-14 w-full mb-5" />

				<Skeleton className="h-14 w-full mb-5" />

				<Skeleton className="h-32 w-full mb-5" />

				<Skeleton className="h-14 w-full mb-5" />

				<Skeleton className="h-12 w-32" />
			</div>
		</div>
	);
};

export default Loading;
