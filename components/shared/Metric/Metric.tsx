import Link from 'next/link';
import { ContentMetrics } from './ContentMetrics/ContentMetrics';
import { MetricProps } from './Metric.interface';
import { metricStyled } from './Metric.styles';

export const Metric = (props: MetricProps): React.JSX.Element =>
	props.href ? (
		<Link href={props.href} className={metricStyled.linkBody}>
			<ContentMetrics {...props} />
		</Link>
	) : (
		<div className={metricStyled.divBody}>
			<ContentMetrics {...props} />
		</div>
	);
