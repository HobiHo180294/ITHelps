// Імпортування необхідних модулів
import { Dynamic } from '@/types';

type StyledKey =
	| 'body'
	| 'selectTrigger'
	| 'selectTriggerBody'
	| 'selectContent'
	| 'selectItem';

export const filterStyled: Dynamic<StyledKey, string> = {
	body: 'relative',
	selectTrigger:
		'body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5',
	selectTriggerBody: 'line-clamp-1 flex-1 text-left',
	selectContent:
		'text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300',
	selectItem: 'cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400',
};
