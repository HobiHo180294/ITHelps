'use client';

import { Input } from '@/components/ui/input';
import { deletePropertiesFromURLQuery, setURLQuery } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CustomInputProps {
	route: string;
	iconPosition: string;
	imgSrc: string;
	placeholder: string;
	otherClasses?: string;
}

const LocalSearchbar = ({
	route,
	iconPosition,
	imgSrc,
	placeholder,
	otherClasses,
}: CustomInputProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const query = searchParams.get('q');

	const [search, setSearch] = useState(query || '');

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (search) {
				const newUrl = setURLQuery({
					parameters: searchParams.toString(),
					property: 'q',
					data: search,
				});

				router.push(newUrl, { scroll: false });
			} else {
				console.log(route, pathname);
				if (pathname === route) {
					const newUrl = deletePropertiesFromURLQuery({
						parameters: searchParams.toString(),
						propertiesToDelete: ['q'],
					});

					router.push(newUrl, { scroll: false });
				}
			}
		}, 300);

		return () => clearTimeout(delayDebounceFn);
	}, [search, route, pathname, router, searchParams, query]);

	return (
		<div
			className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
		>
			{iconPosition === 'left' && (
				<Image
					src={imgSrc}
					alt="іконка пошуку"
					width={24}
					height={24}
					className="cursor-pointer"
				/>
			)}

			<Input
				type="text"
				placeholder={placeholder}
				value={search}
				onChange={e => setSearch(e.target.value)}
				className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
			/>

			{iconPosition === 'right' && (
				<Image
					src={imgSrc}
					alt="іконка пошуку"
					width={24}
					height={24}
					className="cursor-pointer"
				/>
			)}
		</div>
	);
};

export default LocalSearchbar;
