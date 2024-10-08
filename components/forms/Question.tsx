/* eslint-disable camelcase */
'use client';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/context/ThemeProvider';
import { editQuestion, inquire } from '@/lib/actions/question.action';
import { QuestionsSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface Props {
	type?: string;
	mongoUserId: string;
	questionDetails?: string;
}

const Question = ({ type, mongoUserId, questionDetails }: Props) => {
	const { mode } = useTheme();
	const editorRef = useRef(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	const parsedQuestionDetails =
		questionDetails && JSON.parse(questionDetails || '');

	const groupedTags = parsedQuestionDetails?.tags.map((tag: any) => tag.name);

	const form = useForm<z.infer<typeof QuestionsSchema>>({
		resolver: zodResolver(QuestionsSchema),
		defaultValues: {
			title: parsedQuestionDetails?.title || '',
			explanation: parsedQuestionDetails?.content || '',
			tags: groupedTags || [],
		},
	});

	async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
		setIsSubmitting(true);

		try {
			if (type === 'Edit') {
				await editQuestion({
					questionId: parsedQuestionDetails._id,
					title: values.title,
					content: values.explanation,
					path: pathname,
				});

				router.push(`/question/${parsedQuestionDetails._id}`);
			} else {
				await inquire({
					subject: values.title,
					body: values.explanation,
					tags: values.tags,
					creator: JSON.parse(mongoUserId),
					route: pathname,
				});

				router.push('/');
			}
		} catch (error) {
		} finally {
			setIsSubmitting(false);
		}
	}

	const handleInputKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		field: any
	) => {
		if (e.key === 'Enter' && field.name === 'tags') {
			e.preventDefault();

			const tagInput = e.target as HTMLInputElement;
			const tagValue = tagInput.value.trim();

			if (tagValue !== '') {
				if (tagValue.length > 15) {
					return form.setError('tags', {
						type: 'required',
						message: 'Максимальна довжина тегу - 15 символів.',
					});
				}

				if (!field.value.includes(tagValue as never)) {
					form.setValue('tags', [...field.value, tagValue]);
					tagInput.value = '';
					form.clearErrors('tags');
				}
			} else {
				form.trigger();
			}
		}
	};

	const handleTagRemove = (tag: string, field: any) => {
		const newTags = field.value.filter((t: string) => t !== tag);

		form.setValue('tags', newTags);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex w-full flex-col gap-10"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Тема <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl className="mt-3.5">
								<Input
									className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
									{...field}
								/>
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Будь конкретним і лаконічним.
							</FormDescription>
							<FormMessage className="text-pink-600" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="explanation"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col gap-3">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Детальний опис твоєї проблеми{' '}
								<span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl className="mt-3.5">
								<Editor
									apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
									onInit={(evt, editor) => {
										// @ts-ignore
										editorRef.current = editor;
									}}
									onBlur={field.onBlur}
									onEditorChange={content => field.onChange(content)}
									initialValue={parsedQuestionDetails?.content || ''}
									init={{
										height: 350,
										menubar: false,
										plugins: [
											'advlist',
											'autolink',
											'lists',
											'link',
											'image',
											'charmap',
											'preview',
											'anchor',
											'searchreplace',
											'visualblocks',
											'codesample',
											'fullscreen',
											'insertdatetime',
											'media',
											'table',
										],
										toolbar:
											'undo redo | ' +
											'codesample | bold italic forecolor | alignleft aligncenter |' +
											'alignright alignjustify | bullist numlist',
										content_style: 'body { font-family:Inter; font-size:16px }',
										skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
										content_css: mode === 'dark' ? 'dark' : 'light',
									}}
								/>
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Опиши проблему та розшир інформацію, зазначену в заголовку.
								Мінімум 20 символів.
							</FormDescription>
							<FormMessage className="text-pink-600" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Теги <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl className="mt-3.5">
								<>
									<Input
										disabled={type === 'Edit'}
										className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
										placeholder="Додай теги..."
										onKeyDown={e => handleInputKeyDown(e, field)}
									/>

									{field.value.length > 0 && (
										<div className="flex-start mt-2.5 gap-2.5">
											{field.value.map((tag: any) => (
												<Badge
													key={tag}
													className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
													onClick={() =>
														type !== 'Edit'
															? handleTagRemove(tag, field)
															: () => {}
													}
												>
													{tag}
													{type !== 'Edit' && (
														<Image
															src="/assets/icons/close.svg"
															alt="Іконка закриття"
															width={12}
															height={12}
															className="cursor-pointer object-contain invert-0 dark:invert"
														/>
													)}
												</Badge>
											))}
										</div>
									)}
								</>
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Додай до 3 тегів, щоб описати запитання. Натисни Enter для
								призначення тегу.
							</FormDescription>
							<FormMessage className="text-pink-600" />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="primary-gradient w-fit !text-light-900"
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<>{type === 'Edit' ? 'Редагування...' : 'Публікація...'}</>
					) : (
						<>{type === 'Edit' ? 'Відредагуй' : 'Запитай'}</>
					)}
				</Button>
			</form>
		</Form>
	);
};

export default Question;
