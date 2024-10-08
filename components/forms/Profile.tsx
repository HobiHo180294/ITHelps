'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateUser } from '@/lib/actions/user.action';
import { ProfileSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Textarea } from '../ui/textarea';

interface Props {
	clerkId: string;
	user: string;
}

const Profile = ({ clerkId, user }: Props) => {
	const parsedUser = JSON.parse(user);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	const form = useForm<z.infer<typeof ProfileSchema>>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			name: parsedUser.name || '',
			username: parsedUser.username || '',
			portfolioWebsite: parsedUser.portfolioWebsite || undefined,
			location: parsedUser.location || undefined,
			bio: parsedUser.bio || undefined,
		},
	});

	async function onSubmit(values: z.infer<typeof ProfileSchema>) {
		setIsSubmitting(true);

		try {
			await updateUser({
				clerkId,
				updateData: {
					name: values.name,
					username: values.username,
					portfolioWebsite: values.portfolioWebsite || '',
					location: values.location || '',
					bio: values.bio || '',
				},
				path: pathname,
			});

			router.back();
		} catch (error) {
			return error;
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mt-9 flex w-full flex-col gap-9"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Ім&apos;я <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Твоє ім'я"
									className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-pink-600" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Псевдонім <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Твій псевдонім"
									className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-pink-600" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="portfolioWebsite"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Посилання На Портфоліо
							</FormLabel>
							<FormControl>
								<Input
									type="url"
									placeholder="Посилання на твоє портфоліо"
									className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-pink-600" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Місцезнаходження
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Звідки ти?"
									className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-pink-600" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem className="space-y-3.5">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Біографія
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Що робить тебе особливим?"
									className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-pink-600" />
						</FormItem>
					)}
				/>

				<div className="mt-7 flex justify-end">
					<Button
						type="submit"
						className="primary-gradient w-fit"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Зберігається...' : 'Збережи зміни'}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default Profile;
