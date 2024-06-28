// Pagination.test.tsx
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mock, vi } from 'vitest';
import { Pagination } from './Pagination';
import { PaginationProps } from './Pagination.interface';

// Імітація хуків useRouter і useSearchParams
vi.mock('next/navigation', () => ({
	useRouter: vi.fn(),
	useSearchParams: vi.fn(),
}));

const mockPush = vi.fn();
const mockSearchParams = new URLSearchParams('?page=1');

const testProps: PaginationProps = {
	pageNumber: 1,
	isNext: true,
};

describe('Компонент Pagination', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		(useRouter as Mock).mockReturnValue({
			push: mockPush,
		});
		(useSearchParams as Mock).mockReturnValue(mockSearchParams);
	});

	test('відображається коректно з наданим номером сторінки', () => {
		render(<Pagination {...testProps} />);

		expect(screen.getByText('Попередня')).toBeInTheDocument();
		expect(screen.getByText('Наступна')).toBeInTheDocument();
		expect(
			screen.getByText(testProps.pageNumber.toString())
		).toBeInTheDocument();
	});

	test('вимикає кнопку з текстом "Попередня", якщо номер сторінки = 1', () => {
		render(<Pagination {...testProps} />);

		expect(screen.getByText('Попередня').closest('button')).toBeDisabled();
	});

	test('вмикає кнопку з текстом "Попередня", якщо номер сторінки > 1', () => {
		render(<Pagination {...testProps} pageNumber={2} />);

		expect(screen.getByText('Попередня').closest('button')).not.toBeDisabled();
	});

	test('вимикає кнопку з текстом "Наступна", коли isNext дорівнює false', () => {
		render(<Pagination {...testProps} isNext={false} />);

		expect(screen.getByText('Наступна').closest('button')).toBeDisabled();
	});

	test('викликає функцію navigateHandler з правильними аргументами за натискання на кнопку з текстом "Попередня"', () => {
		render(<Pagination {...testProps} pageNumber={2} />);

		fireEvent.click(screen.getByText('Попередня'));

		expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=1'));
	});

	test('викликає navigateHandler з правильними аргументами за натискання на кнопку з текстом "Наступна"', () => {
		render(<Pagination {...testProps} />);

		fireEvent.click(screen.getByText('Наступна'));

		expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=2'));
	});

	test('відповідає знімку', () => {
		const { asFragment } = render(<Pagination {...testProps} />);
		expect(asFragment()).toMatchSnapshot();
	});
});
