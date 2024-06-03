import {
	CURRENCY_NOTATIONS,
	MEDAL_STANDARD,
	TIME_INTERVALS,
} from '@/constants';
import { JobPageFilters } from '@/constants/filters';
import { FilterProps, MedalParameter, MedalQuantity, Nullable } from '@/types';
import { ClassSpecifier, clsx } from 'clsx';
import qs, { ParsedQuery } from 'query-string';
import { twMerge } from 'tailwind-merge';
import type { GetFormattedSalaryParams } from './actions/shared.types';

type Division = {
	divisor: number;
	suffix: string;
};

interface QueryParameter {
	parameters: string;
	property: string;
	data: Nullable<string>;
}

interface DeleteURLQueryParameter {
	parameters: string;
	propertiesToDelete: string[];
}

const DIVISIONS: Division[] = [
	{ divisor: 1000000, suffix: 'M' },
	{ divisor: 1000, suffix: 'K' },
	{ divisor: 1, suffix: '' },
];

export const mergeClassNames = (...classNames: ClassSpecifier[]): string =>
	twMerge(clsx(classNames));

export const defineTimeUnitCountableForm = (
	timeUnit: number,
	[one, few, many]: string[]
): string =>
	timeUnit % 10 === 1 && timeUnit % 100 !== 11
		? one
		: [2, 3, 4].includes(timeUnit % 10) &&
		  ![12, 13, 14].includes(timeUnit % 100)
		? few
		: many;

export const getRelativeTime = (createdAt: Date): string => {
	const currentTimeMoment = new Date();
	const elapsedTime = currentTimeMoment.getTime() - createdAt.getTime();

	for (const { value, forms } of TIME_INTERVALS) {
		const timeUnit = Math.floor(elapsedTime / value);
		if (timeUnit >= 1)
			return `${timeUnit} ${defineTimeUnitCountableForm(timeUnit, forms)} тому`;
	}

	return 'щойно';
};

export const formatNumberWithSuffix = (initialNumber: number): string => {
	for (const { divisor, suffix } of DIVISIONS)
		if (initialNumber >= divisor) {
			const formattedNumber = initialNumber / divisor;

			return `${
				divisor === 1 || formattedNumber % 1 === 0
					? Math.floor(formattedNumber)
					: formattedNumber.toFixed(1)
			}${suffix}`;
		}

	return initialNumber.toString();
};

export const getBecomeParticipantDate = (date: Date): string => {
	const fullMonthName = date.toLocaleString('uk-UA', { month: 'long' });
	const monthNameCapitalized =
		fullMonthName.charAt(0).toUpperCase() + fullMonthName.slice(1);
	const fullYear = date.getFullYear();

	return `${monthNameCapitalized} ${fullYear}`;
};

const getQsStringifiedURLObject = (URL: ParsedQuery<string>): string =>
	qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: URL,
		},
		{
			skipNull: true,
		}
	);

export const setURLQuery = ({
	parameters,
	property,
	data,
}: QueryParameter): string => {
	const actualURL = qs.parse(parameters);
	actualURL[property] = data;
	return getQsStringifiedURLObject(actualURL);
};

export const deletePropertiesFromURLQuery = ({
	parameters,
	propertiesToDelete,
}: DeleteURLQueryParameter) => {
	const actualURL = qs.parse(parameters);
	propertiesToDelete.forEach(property => delete actualURL[property]);
	return getQsStringifiedURLObject(actualURL);
};

export const assignMedals = (parameters: MedalParameter[]): MedalQuantity => {
	const medalQuantity: MedalQuantity = {
		GOLD: 0,
		SILVER: 0,
		BRONZE: 0,
	};

	parameters.forEach(unit => {
		const { quantityVariant, quantity } = unit;
		const medalLevels = MEDAL_STANDARD[quantityVariant];

		Object.keys(medalLevels).forEach(level => {
			if (quantity >= medalLevels[level as keyof MedalQuantity])
				medalQuantity[level as keyof MedalQuantity] += 1;
		});
	});

	return medalQuantity;
};

export const employmentTypeConverter = (type: string): string => {
	let employmentType: string = '';

	JobPageFilters.forEach((filter: FilterProps) => {
		if (filter.value === type) {
			employmentType = filter.name;
		}
	});

	return employmentType;
};

export const getFormattedSalary = ({
	min,
	max,
	currency,
	period,
}: GetFormattedSalaryParams) => {
	if (!min || !max) return null;

	const salaryInfo = {
		symbol: CURRENCY_NOTATIONS[currency] || '$',
		low: salaryFormatter(min, 1),
		high: salaryFormatter(max, 1),
		per: period ? `/${period.toLowerCase()}ly` : '',
	};

	const { symbol, low, high, per } = salaryInfo;

	const formattedSalary = `${symbol}${low} - ${symbol}${high}${per}`;

	return formattedSalary as string;
};

const salaryFormatter = (num: number, digits: number) => {
	const lookup = [
		{ value: 1, symbol: '' },
		{ value: 1e3, symbol: 'k' },
		{ value: 1e6, symbol: 'M' },
		{ value: 1e9, symbol: 'G' },
		{ value: 1e12, symbol: 'T' },
		{ value: 1e15, symbol: 'P' },
		{ value: 1e18, symbol: 'E' },
	];

	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	const lookupItem = lookup
		.slice()
		.reverse()
		.find(item => num >= item.value);
	return lookupItem
		? (num / lookupItem.value).toFixed(digits).replace(rx, '$1') +
				lookupItem.symbol
		: '0';
};

export function isValidImage(url: string) {
	return /\.(jpg|jpeg|png|webp||svg)$/.test(url);
}
