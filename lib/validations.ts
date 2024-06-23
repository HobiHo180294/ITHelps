import * as z from 'zod';

const MIN_5_ERROR = 'Мінімальна довжина - 5 символів!';
const MAX_50_ERROR = 'Мінімальна довжина - 5 символів!';

export const QuestionsSchema = z.object({
	title: z
		.string()
		.min(5, {
			message: MIN_5_ERROR,
		})
		.max(130, {
			message: 'Максимальна довжина - 130 символів!',
		}),
	explanation: z
		.string()
		.min(100, { message: 'Мінімальна довжина - 100 символів!' }),
	tags: z
		.array(
			z
				.string()
				.min(1, { message: 'Тег не може бути порожнім!' })
				.max(15, { message: 'Максимальна довжина тегу - 15 символів!' })
		)
		.min(1, { message: 'Будь ласка додай хоча б один тег!' })
		.max(3, { message: 'Максимально можлива кількість тегів - 3!' }),
});

export const AnswerSchema = z.object({
	answer: z.string().min(90, { message: 'Мінімальна довжина - 90 символів!' }),
});

export const ProfileSchema = z.object({
	name: z
		.string()
		.min(5, {
			message: MIN_5_ERROR,
		})
		.max(50, {
			message: MAX_50_ERROR,
		}),
	username: z
		.string()
		.min(5, {
			message: MIN_5_ERROR,
		})
		.max(50, {
			message: MAX_50_ERROR,
		}),
	bio: z
		.string()
		.min(10, {
			message: 'Мінімальна довжина - 10 символів!',
		})
		.max(150, {
			message: 'Максимальна довжина - 150 символів!',
		})
		.optional(),
	portfolioWebsite: z.string().url().optional(),
	location: z
		.string()
		.min(5, {
			message: MIN_5_ERROR,
		})
		.max(50, {
			message: MAX_50_ERROR,
		})
		.optional(),
});
