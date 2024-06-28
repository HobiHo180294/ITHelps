'use client';

// Імпортування необхідних модулів
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

// Функція для оновлення параметрів запиту URL
const updateQueryParams = (
	queryParameters: ReadonlyURLSearchParams,
	routeHandler: AppRouterInstance,
	value: string
): void => {
	// Формування нового URL з оновленими параметрами запиту
	const refreshedUrl = setURLQuery({
		parameters: queryParameters.toString(),
		property: 'filter',
		data: value,
	});

	// Переходить до нового URL без прокрутки сторінки
	routeHandler.push(refreshedUrl, { scroll: false });
};

export const Filter = (props: FilterProps): React.JSX.Element => {
	const queryParameters = useSearchParams();
	const routeHandler = useRouter();

	const queryFilter = queryParameters.get('filter');

	return (
		// Основний контейнер компонента зі стилями та додатковими класами
		<div className={`${filterStyled.body} ${props.containerClasses}`}>
			<Select
				// Оновлення параметрів URL при зміні значення вибору
				onValueChange={value =>
					updateQueryParams(queryParameters, routeHandler, value)
				}
				// Встановлення значення за замовчуванням з параметра "filter" або undefined
				defaultValue={queryFilter || undefined}
			>
				<SelectTrigger
					className={`${props.otherClasses} ${filterStyled.selectTrigger}`}
				>
					<div className={filterStyled.selectTriggerBody}>
						\{/* Плейсхолдер для вибору фільтра */}
						<SelectValue placeholder="Обери Фільтр" />
					</div>
				</SelectTrigger>
				<SelectContent className={filterStyled.selectContent}>
					<SelectGroup>
						{/* Відображення елементів вибору фільтрів з властивостей компонента */}
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
