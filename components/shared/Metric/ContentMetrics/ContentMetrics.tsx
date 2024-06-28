// Імпортування необхідних модулей
import Image from 'next/image';
import { MetricProps } from '../Metric.interface';
import { contentMetricsStyled } from './ContentMetrics.styles';

export const ContentMetrics = (props: MetricProps): React.JSX.Element => (
	<>
		{/* Компонент Image для відображення зображення */}
		<Image
			src={props.imgUrl}
			width={16}
			height={16}
			alt={props.alt}
			className={`${contentMetricsStyled.image} ${props.href ? contentMetricsStyled.imageWithHref : ''}`}
		/>

		<p className={`${props.textStyles} ${contentMetricsStyled.paragraph}`}>
			{/* Значення тексту, передане від батьківського компоненту */}
			{props.value}
			<span
				className={`${contentMetricsStyled.paragraphSpan} ${props.isAuthor ? contentMetricsStyled.paragraphSpanIsAuthor : ''}`}
			>
				{/* Заголовок, переданий від батьківського компоненту */}
				{props.title}
			</span>
		</p>
	</>
);
