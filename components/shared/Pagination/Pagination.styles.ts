import { Dynamic } from '@/types';

type StyledKey =
	| 'body'
	| 'prevButton'
	| 'prevButtonText'
	| 'center'
	| 'centerPageNumber'
	| 'nextButton'
	| 'nextButtonText';

export const paginationStyled: Dynamic<StyledKey, string> = {
	body: 'flex w-full items-center justify-center gap-2',
	prevButton:
		'light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border',
	prevButtonText: 'body-medium text-dark200_light800',
	center:
		'flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2',
	centerPageNumber: 'body-semibold text-light-900',
	nextButton:
		'light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border',
	nextButtonText: 'body-medium text-dark200_light800',
};
