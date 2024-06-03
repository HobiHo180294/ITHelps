import { Dynamic, MedalStandard, SidebarLink } from '@/types';

export const themes = [
	{ value: 'light', label: 'Light', icon: '/assets/icons/sun.svg' },
	{ value: 'dark', label: 'Dark', icon: '/assets/icons/moon.svg' },
	{ value: 'system', label: 'System', icon: '/assets/icons/computer.svg' },
];

export const sidebarLinks: SidebarLink[] = [
	{
		imgURL: '/assets/icons/home.svg',
		route: '/',
		label: 'Домашня',
	},
	{
		imgURL: '/assets/icons/users.svg',
		route: '/community',
		label: 'Спільнота',
	},
	{
		imgURL: '/assets/icons/star.svg',
		route: '/collection',
		label: 'Колекції',
	},
	{
		imgURL: '/assets/icons/suitcase.svg',
		route: '/jobs',
		label: 'Робота',
	},
	{
		imgURL: '/assets/icons/tag.svg',
		route: '/tags',
		label: 'Теги',
	},
	{
		imgURL: '/assets/icons/user.svg',
		route: '/profile',
		label: 'Профіль',
	},
	{
		imgURL: '/assets/icons/question.svg',
		route: '/ask-question',
		label: 'Запитай',
	},
];

export const MEDAL_STANDARD: MedalStandard = {
	QUESTION_COUNT: {
		BRONZE: 10,
		SILVER: 50,
		GOLD: 100,
	},
	ANSWER_COUNT: {
		BRONZE: 10,
		SILVER: 50,
		GOLD: 100,
	},
	QUESTION_UPVOTES: {
		BRONZE: 10,
		SILVER: 50,
		GOLD: 100,
	},
	ANSWER_UPVOTES: {
		BRONZE: 10,
		SILVER: 50,
		GOLD: 100,
	},
	TOTAL_VIEWS: {
		BRONZE: 1000,
		SILVER: 10000,
		GOLD: 100000,
	},
};

export const CURRENCY_NOTATIONS: { [key: string]: string } = {
	ALL: 'Lek',
	AFN: '؋',
	ARS: '$',
	AWG: 'ƒ',
	AUD: '$',
	AZN: 'ман',
	BSD: '$',
	BYR: 'p.',
	BZD: 'BZ$',
	BMD: '$',
	BOB: '$b',
	BAM: 'KM',
	BWP: 'P',
	BGN: 'лв',
	BRL: 'R$',
	BND: '$',
	KHR: '៛',
	CAD: '$',
	KYD: '$',
	CLP: '$',
	CNY: '¥',
	COP: '$',
	CRC: '₡',
	HRK: 'kn',
	CUP: '₱',
	CZK: 'Kč',
	DKK: 'kr',
	DOP: 'RD$',
	XCD: '$',
	EGP: '£',
	SVC: '$',
	EEK: 'kr',
	EUR: '€',
	FKP: '£',
	FJD: '$',
	GHC: '¢',
	GIP: '£',
	GTQ: 'Q',
	GGP: '£',
	GYD: '$',
	HNL: 'L',
	HKD: '$',
	HUF: 'Ft',
	ISK: 'kr',
	INR: '₹',
	IDR: 'Rp',
	IRR: '﷼',
	IMP: '£',
	ILS: '₪',
	JMD: 'J$',
	JPY: '¥',
	JEP: '£',
	KZT: 'лв',
	KPW: '₩',
	KRW: '₩',
	KGS: 'лв',
	LAK: '₭',
	LVL: 'Ls',
	LBP: '£',
	LRD: '$',
	LTL: 'Lt',
	MKD: 'ден',
	MYR: 'RM',
	MUR: '₨',
	MXN: '$',
	MNT: '₮',
	MZN: 'MT',
	NAD: '$',
	NPR: '₨',
	ANG: 'ƒ',
	NZD: '$',
	NIO: 'C$',
	NGN: '₦',
	NOK: 'kr',
	OMR: '﷼',
	PKR: '₨',
	PAB: 'B/.',
	PYG: 'Gs',
	PEN: 'S/.',
	PHP: '₱',
	PLN: 'zł',
	QAR: '﷼',
	RON: 'lei',
	RUB: 'руб',
	SHP: '£',
	SAR: '﷼',
	RSD: 'Дин.',
	SCR: '₨',
	SGD: '$',
	SBD: '$',
	SOS: 'S',
	ZAR: 'R',
	LKR: '₨',
	SEK: 'kr',
	CHF: 'CHF',
	SRD: '$',
	SYP: '£',
	TWD: 'NT$',
	THB: '฿',
	TTD: '$',
	TRY: '₤',
	TRL: '₤',
	TVD: '$',
	UAH: '₴',
	GBP: '£',
	USD: '$',
	UYU: '$U',
	UZS: 'лв',
	VEF: 'Bs',
	VND: '₫',
	YER: '﷼',
	ZWD: 'Z$',
};

type TimeUnitName =
	| 'second'
	| 'minute'
	| 'hour'
	| 'day'
	| 'week'
	| 'month'
	| 'year';

type TimeInterval = {
	value: number;
	forms: string[];
};

export const TIME_UNITS: Dynamic<TimeUnitName, number> = {
	second: 1000,
	minute: 60 * 1000,
	hour: 60 * 60 * 1000,
	day: 24 * 60 * 60 * 1000,
	week: 7 * 24 * 60 * 60 * 1000,
	month: 30 * 24 * 60 * 60 * 1000,
	year: 365 * 24 * 60 * 60 * 1000,
};

export const TIME_INTERVALS: TimeInterval[] = [
	{ value: TIME_UNITS.year, forms: ['рік', 'роки', 'років'] },
	{ value: TIME_UNITS.month, forms: ['місяць', 'місяці', 'місяців'] },
	{ value: TIME_UNITS.week, forms: ['тиждень', 'тижні', 'тижнів'] },
	{ value: TIME_UNITS.day, forms: ['день', 'дні', 'днів'] },
	{ value: TIME_UNITS.hour, forms: ['годину', 'години', 'годин'] },
	{ value: TIME_UNITS.minute, forms: ['хвилину', 'хвилини', 'хвилин'] },
	{ value: TIME_UNITS.second, forms: ['секунду', 'секунди', 'секунд'] },
];
