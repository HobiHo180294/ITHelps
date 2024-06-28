import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { RenderTagProps } from './RenderTag.interface';
import { renderTagStyled } from './RenderTag.styles';

export const RenderTag = (props: RenderTagProps): React.JSX.Element => (
	<Link href={`/tags/${props._id}`} className={renderTagStyled.link}>
		<Badge className={renderTagStyled.nameBadge}>{props.name}</Badge>

		{props.showCount && (
			<p className={renderTagStyled.showCountParagraph}>
				{props.totalQuestions}
			</p>
		)}
	</Link>
);
