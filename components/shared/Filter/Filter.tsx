'use client';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { setURLQuery } from '@/lib/utils';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
	ReadonlyURLSearchParams,
	useRouter,
	useSearchParams,
} from 'next/navigation';
import { FilterProps } from './Filter.interface';
import { filterStyled } from './Filter.styles';

const updateQueryParams = (
	queryParameters: ReadonlyURLSearchParams,
	routeHandler: AppRouterInstance,
	value: string
): void => {
	const refreshedUrl = setURLQuery({
		parameters: queryParameters.toString(),
		property: 'filter',
		data: value,
	});

	routeHandler.push(refreshedUrl, { scroll: false });
};

export const Filter = (props: FilterProps): React.JSX.Element => {
	const queryParameters = useSearchParams();
	const routeHandler = useRouter();

	const queryFilter = queryParameters.get('filter');

	return (
		<div className={`${filterStyled.body} ${props.containerClasses}`}>
			<Select
				onValueChange={value =>
					updateQueryParams(queryParameters, routeHandler, value)
				}
				defaultValue={queryFilter || undefined}
			>
				<SelectTrigger
					className={`${props.otherClasses} ${filterStyled.selectTrigger}`}
				>
					<div className={filterStyled.selectTriggerBody}>
						<SelectValue placeholder="Обери Фільтр" />
					</div>
				</SelectTrigger>
				<SelectContent className={filterStyled.selectContent}>
					<SelectGroup>
						{props.filters.map(item => (
							<SelectItem
								key={item.value}
								value={item.value}
								className={filterStyled.selectItem}
							>
								{item.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};
