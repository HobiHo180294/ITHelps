// Імпортування необхідних модулів
import { Dynamic } from '@/types';

type StyledKey =
	| 'menuBar'
	| 'menuBarTrigger'
	| 'triggerImage'
	| 'menuBarContent'
	| 'menuBarItem'
	| 'paragraph'
	| 'lightValue'
	| 'darkValue';

export const themeStyled: Dynamic<StyledKey, string> = {
	menuBar: 'relative border-none bg-transparent shadow-none',
	menuBarTrigger:
		'focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200',
	triggerImage: 'active-theme',
	menuBarContent:
		'absolute right-[-3rem] mt-3 min-w-[120px] rounded border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300',
	menuBarItem: 'flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400',
	paragraph: 'body-semibold text-light-500',
	lightValue: 'text-primary-500',
	darkValue: 'text-dark100_light900',
};
