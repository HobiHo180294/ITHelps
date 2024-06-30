import { Dynamic } from '@/types';

type StyledKey =
	| 'image'
	| 'imageWithHref'
	| 'paragraph'
	| 'paragraphSpan'
	| 'paragraphSpanIsAuthor';

export const contentMetricsStyled: Dynamic<StyledKey, string> = {
	image: 'object-contain',
	imageWithHref: 'rounded-full',
	paragraph: 'flex items-center gap-1',
	paragraphSpan: 'small-regular line-clamp-1',
	paragraphSpanIsAuthor: 'max-sm:hidden',
};
