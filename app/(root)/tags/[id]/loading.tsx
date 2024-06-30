import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
	return (
		<section className="relative">
			<div className="absolute inset-0 flex items-start justify-center bg-background/50 z-10 pt-20 sm:pt-32">
				<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary sm:h-24 sm:w-24 md:h-32 md:w-32">
					<span className="sr-only">Завантаження...</span>
				</div>
			</div>

			<Skeleton className="h-12 w-52" />

			<Skeleton className="mb-12 mt-11 h-14 w-full" />

			<div className="mt-10 flex flex-col gap-6">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
					<Skeleton key={item} className="h-48 w-full rounded-xl" />
				))}
			</div>
		</section>
	);
};

export default Loading;
