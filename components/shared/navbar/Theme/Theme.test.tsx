import { themes } from '@/constants';
import { ThemeProvider, useTheme } from '@/context/ThemeProvider';
import { Children } from '@/types';
import '@testing-library/jest-dom';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import Image from 'next/image';
import { beforeAll, describe, expect, vi } from 'vitest';
import Theme from './Theme';

const MockTheme = (): React.JSX.Element => {
	const { mode, setMode } = useTheme();

	return (
		<div>
			{themes.map(item => (
				<button
					key={item.value}
					onClick={() => {
						setMode(item.value);
						if (item.value !== 'system') {
							localStorage.theme = item.value;
						} else {
							localStorage.removeItem('theme');
						}
					}}
				>
					{item.value}
				</button>
			))}

			<Image
				width={20}
				height={20}
				src={themes[0].icon}
				alt={`${mode} theme icon`}
			/>
		</div>
	);
};

describe('Компонент Theme', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: vi.fn().mockImplementation(_ => ({
				matches: false,
			})),
		});
	});

	it('овинен відображатися в межах ThemeProvider', () => {
		render(
			<ThemeProvider>
				<Theme />
			</ThemeProvider>
		);
	});

	it('повинен бути у світлому режимі за замовчуванням', () => {
		const wrapper = ({ children }: Children) => (
			<ThemeProvider>{children}</ThemeProvider>
		);

		const { result } = renderHook(() => useTheme(), { wrapper });
		expect(result.current.mode).toBe('light');
	});

	it('повинен змінювати свій режим зі світлого на темний', () => {
		render(
			<ThemeProvider>
				<MockTheme />
			</ThemeProvider>
		);

		const resultElement = screen.getByRole('img');
		expect(resultElement.getAttribute('alt')).toBe('light theme icon');

		const darkThemeButton = screen.getByText('dark');
		fireEvent.click(darkThemeButton);
		expect(resultElement.getAttribute('alt')).toBe('dark theme icon');
	});

	it('истемний режим повинен відповідати бажаному режиму користувача', () => {
		render(
			<ThemeProvider>
				<MockTheme />
			</ThemeProvider>
		);

		const resultElement = screen.getByRole('img');
		expect(resultElement.getAttribute('alt')).toBe('dark theme icon');

		const systemThemeButton = screen.getByText('system');
		fireEvent.click(systemThemeButton);
		expect(resultElement.getAttribute('alt')).toBe('light theme icon');
	});
});
