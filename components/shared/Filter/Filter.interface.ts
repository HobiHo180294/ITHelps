type Filter = {
	name: string;
	value: string;
};

export interface FilterProps {
	filters: Filter[];
	otherClasses?: string;
	containerClasses?: string;
}
