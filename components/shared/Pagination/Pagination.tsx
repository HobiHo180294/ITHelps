'use client';

// Імпортування необхідних модулів
import { Button } from '@/components/ui/button';
import { setURLQuery } from '@/lib/utils';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
	ReadonlyURLSearchParams,
	useRouter,
	useSearchParams,
} from 'next/navigation';
import { PaginationProps } from './Pagination.interface';
import { paginationStyled } from './Pagination.styles';

// Функція для обробки навігації між сторінками
const navigateHandler = (
	pageNumber: PaginationProps['pageNumber'],
	queryParameters: ReadonlyURLSearchParams,
	routeHandler: AppRouterInstance,
	route: string
): void => {
	const followingPageNumber =
		route === 'prev' ? pageNumber - 1 : pageNumber + 1;

	const refreshedUrl = setURLQuery({
		parameters: queryParameters.toString(),
		property: 'page',
		data: followingPageNumber.toString(),
	});

	routeHandler.push(refreshedUrl);
};

export const Pagination = (props: PaginationProps): React.JSX.Element => {
	const routeHandler = useRouter();
	const queryParameters = useSearchParams();

	return (
		// Основний контейнер компонента зі стилями
		<div className={paginationStyled.body}>
			{/* Кнопка "Попередня" */}
			<Button
				disabled={props.pageNumber === 1}
				onClick={() =>
					navigateHandler(
						props.pageNumber,
						queryParameters,
						routeHandler,
						'prev'
					)
				}
				className={paginationStyled.prevButton}
			>
				<p className={paginationStyled.prevButtonText}>Попередня</p>
			</Button>
			{/* Відображення поточного номера сторінки */}
			<div className={paginationStyled.center}>
				<p className={paginationStyled.centerPageNumber}>{props.pageNumber}</p>
			</div>
			{/* Кнопка "Наступна" */}
			<Button
				disabled={!props.isNext}
				onClick={() =>
					navigateHandler(
						props.pageNumber,
						queryParameters,
						routeHandler,
						'next'
					)
				}
				className={paginationStyled.nextButton}
			>
				<p className={paginationStyled.nextButtonText}>Наступна</p>
			</Button>
		</div>
	);
};
