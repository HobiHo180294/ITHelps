// Імпортування необхідних модулей
import Link from 'next/link';
import { ContentMetrics } from './ContentMetrics/ContentMetrics';
import { MetricProps } from './Metric.interface';
import { metricStyled } from './Metric.styles';

export const Metric = (props: MetricProps): React.JSX.Element =>
	// Перевірка щодо наявності значення href у властивостях
	props.href ? (
		// Якщо href присутній, компонент Link використовується для створення посилання
		<Link href={props.href} className={metricStyled.linkBody}>
			<ContentMetrics {...props} />
		</Link>
	) : (
		// Якщо href відсутній, використовується div для обгортки вмісту
		<div className={metricStyled.divBody}>
			<ContentMetrics {...props} />
		</div>
	);
