// Імпортування необхідних модулів
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { RenderTagProps } from './RenderTag.interface';
import { renderTagStyled } from './RenderTag.styles';

export const RenderTag = (props: RenderTagProps): React.JSX.Element => (
	// Використання компоненту Link для створення посилання на тег з переданим ідентифікатором
	<Link href={`/tags/${props._id}`} className={renderTagStyled.link}>
		{/* Використання компоненту Badge для відображення імені тегу */}
		<Badge className={renderTagStyled.nameBadge}>{props.name}</Badge>

		{/* Перевірка умови, якщо лічильник є істинним, відображається кількість питань */}
		{props.showCount && (
			<p className={renderTagStyled.showCountParagraph}>
				{props.totalQuestions}
			</p>
		)}
	</Link>
);
