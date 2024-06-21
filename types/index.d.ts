import { ReactNode } from 'react';

export type Dynamic<Key extends PropertyKey, Value> = Record<Key, Value>;

export interface Children {
	children: ReactNode;
}

export interface SidebarLink {
	imgURL: string;
	route: string;
	label: string;
}

export interface Job {
	id?: string;
	employer_name?: string;
	employer_logo?: string | undefined;
	employer_website?: string;
	job_employment_type?: string;
	job_title?: string;
	job_description?: string;
	job_apply_link?: string;
	job_city?: string;
	job_state?: string;
	job_country?: string;
}

export interface Country {
	name: {
		common: string;
	};
}

export interface ParamsProps {
	params: { id: string };
}

export interface SearchParamsProps {
	searchParams: { [key: string]: string | undefined };
}

export interface URLProps {
	params: { id: string };
	searchParams: { [key: string]: string | undefined };
}

export type MedalQuantityVariant =
	| 'QUESTION_COUNT'
	| 'ANSWER_COUNT'
	| 'QUESTION_UPVOTES'
	| 'ANSWER_UPVOTES'
	| 'TOTAL_VIEWS';

export interface MedalParameter {
	quantityVariant: MedalQuantityVariant;
	quantity: number;
}

export interface MedalQuantity {
	GOLD: number;
	SILVER: number;
	BRONZE: number;
}

export type MedalStandard = Dynamic<MedalQuantityVariant, MedalQuantity>;

export interface FilterProps {
	name: string;
	value: string;
}

export type Nullable<Target> = Target | null;
