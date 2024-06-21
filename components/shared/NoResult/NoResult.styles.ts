import { Dynamic } from '@/types';

type StyledKey =
	| 'body'
	| 'darkThemeImage'
	| 'lightThemeImage'
	| 'title'
	| 'description'
	| 'link';

export const noResultComponentStyled: Dynamic<StyledKey, string> = {
	body: 'mt-10 flex w-full flex-col items-center justify-center',
	darkThemeImage: 'block object-contain dark:hidden',
	lightThemeImage: 'hidden object-contain dark:flex',
	title: 'h2-bold text-dark200_light900 mt-8',
	description: 'body-regular text-dark500_light700 my-3.5 max-w-md text-center',
	link: 'paragraph-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900',
};
