'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { deletePropertiesFromURLQuery, setURLQuery } from '@/lib/utils';

interface Props {
	query: string;
	label: string;
}

const Switcher = ({ query, label }: Props) => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const paramFilter = searchParams.get(query);

	const handleUpdateParams = (value: string) => {
		let newUrl;

		if (!value) {
			newUrl = deletePropertiesFromURLQuery({
				parameters: searchParams.toString(),
				propertiesToDelete: [query],
			});
		} else {
			newUrl = setURLQuery({
				parameters: searchParams.toString(),
				property: query,
				data: value,
			});
		}

		router.push(newUrl, { scroll: false });
	};

	return (
		<>
			<Switch
				id={`${query}-switcher`}
				className="ml-4 mr-2"
				checked={paramFilter === 'true'}
				// @ts-expect-error
				onCheckedChange={handleUpdateParams}
			/>
			<Label htmlFor={`${query}-switcher`} className="text-light-500">
				{label}
			</Label>
		</>
	);
};

export default Switcher;
