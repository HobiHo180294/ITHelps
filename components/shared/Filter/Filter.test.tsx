// Імпортування необхідних модулів
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Mock, vi } from 'vitest';
import { Filter } from './Filter';
import { FilterProps } from './Filter.interface';

// Імітація хуків useRouter і useSearchParams
vi.mock('next/navigation', () => ({
	useRouter: vi.fn(),
	useSearchParams: vi.fn(),
}));

// Імітація даних для тестових сценаріїв
const mockFilters = [
	{ value: 'all', name: 'Всі' },
	{ value: 'active', name: 'Активні' },
	{ value: 'completed', name: 'Завершені' },
];

const mockProps: FilterProps = {
	filters: mockFilters,
	containerClasses: 'custom-container',
	otherClasses: 'custom-trigger',
};

describe('Компонент Filter', () => {
	let pushMock: ReturnType<typeof vi.fn>;
	let searchParamsMock: URLSearchParams;

	beforeEach(() => {
		pushMock = vi.fn();
		searchParamsMock = new URLSearchParams('?filter=active');

		(useRouter as Mock).mockReturnValue({
			push: pushMock,
		});

		(useSearchParams as Mock).mockReturnValue(searchParamsMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	test('відображається коректно зі вказаними фільтрами', () => {
		render(<Filter {...mockProps} />);

		expect(screen.getByPlaceholderText('Обери Фільтр')).toBeInTheDocument();
		mockFilters.forEach(filter => {
			expect(screen.getByText(filter.name)).toBeInTheDocument();
		});
	});

	test('встановлює значення за замовчуванням згідно з параметром URL-запиту', () => {
		render(<Filter {...mockProps} />);

		expect(screen.getByText('Активні')).toBeInTheDocument();
	});

	test('оновлює параметри запиту з правильними аргументами за зміни значення', () => {
		render(<Filter {...mockProps} />);

		fireEvent.click(screen.getByPlaceholderText('Обери Фільтр'));
		fireEvent.click(screen.getByText('Завершені'));

		expect(pushMock).toHaveBeenCalledWith(
			expect.stringContaining('filter=completed'),
			{ scroll: false }
		);
	});

	test('застосовує передані класи контейнера та тригера', () => {
		render(<Filter {...mockProps} />);

		const container = screen.getByRole('combobox').parentElement;
		expect(container).toHaveClass('custom-container');

		const trigger = screen.getByPlaceholderText('Обери Фільтр').parentElement;
		expect(trigger).toHaveClass('custom-trigger');
	});
});
