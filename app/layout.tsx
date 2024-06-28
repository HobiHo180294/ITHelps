// Імпортування необхідних модулів
import { ThemeProvider } from '@/context/ThemeProvider';
import { Children } from '@/types';
import { ukUA } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter, Roboto_Condensed } from 'next/font/google';
import '../styles/prism.css';
import './globals.css';

// Налаштування шрифту Inter
const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-inter',
});

// Налаштування шрифту Roboto Condensed
const robotoCondensed = Roboto_Condensed({
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-robotoCondensed',
});

// Визначення метаданих для сторінки
export const metadata: Metadata = {
	title: 'ITHelps',
	description:
		'IT-Спільнота для взаємодопомоги та обміну знаннями. Отримуй допомогу, ділись своїми знаннями та співпрацюй із розробниками з усього світу.  Занурся в такі теми, як веб-розробка, розробка мобільних додатків, алгоритми, структури даних і багато іншого.',
	icons: {
		icon: '/assets/images/site-logo.svg',
	},
};

export default function RootLayout({ children }: Children) {
	return (
		<html lang="ua">
			{/* Визначення мови сторінки */}
			<body className={`${inter.variable} ${robotoCondensed.variable}`}>
				{/* Застосування шрифтів глобально */}
				<ClerkProvider
					localization={ukUA} // Налаштування української локалізації для платформи Clerk
					appearance={{
						elements: {
							formButtonPrimary: 'primary-gradient', // Класи для стилізації основної кнопки у формах
							footerActionLink: 'primary-text-gradient hover:text-primary-500', // Класи для стилізації посилань у футері
						},
					}}
				>
					<ThemeProvider>
						{/* Обгортання майбутніх компонентів-нащадків у ThemeProvider для управління темою */}
						{children}
					</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
