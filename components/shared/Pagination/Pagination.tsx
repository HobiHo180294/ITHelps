'use client';

import { Button } from '@/components/ui/button';
import { setURLQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { PaginationProps } from './Pagination.interface';
import { paginationStyled } from './Pagination.styles';

export const Pagination = ({ pageNumber, isNext }: PaginationProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleNavigation = (direction: string) => {
		const nextPageNumber =
			direction === 'prev' ? pageNumber - 1 : pageNumber + 1;

		const newUrl = setURLQuery({
			parameters: searchParams.toString(),
			property: 'page',
			data: nextPageNumber.toString(),
		});

		router.push(newUrl);
	};

	if (!isNext && pageNumber === 1) return null;

	return (
		<div className={paginationStyled.body}>
			<Button
				disabled={pageNumber === 1}
				onClick={() => handleNavigation('prev')}
				className={paginationStyled.prevButton}
			>
				<p className={paginationStyled.prevButtonText}>Попередня</p>
			</Button>
			<div className={paginationStyled.center}>
				<p className={paginationStyled.centerPageNumber}>{pageNumber}</p>
			</div>
			<Button
				disabled={!isNext}
				onClick={() => handleNavigation('next')}
				className={paginationStyled.nextButton}
			>
				<p className={paginationStyled.nextButtonText}>Наступна</p>
			</Button>
		</div>
	);
};
