import { Dynamic } from '@/types';

type StyledKey = 'link' | 'nameBadge' | 'showCountParagraph';

export const renderTagStyled: Dynamic<StyledKey, string> = {
	link: 'flex justify-between gap-2',
	nameBadge:
		'subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase',
	showCountParagraph: 'small-medium text-dark500_light700',
};
