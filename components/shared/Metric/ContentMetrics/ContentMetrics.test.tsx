// Імпортування необхідних модулей
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MetricProps } from '../Metric.interface';
import { ContentMetrics } from './ContentMetrics';

describe('Компонент ContentMetrics', () => {
	const defaultProps: MetricProps = {
		imgUrl: '/path/to/image.png',
		alt: 'Test Image',
		value: '123',
		title: 'Test Title',
		textStyles: 'text-style-class',
		href: '',
		isAuthor: false,
	};

	it('відображає зображення з правильними src, шириною, висотою та alt', () => {
		render(<ContentMetrics {...defaultProps} />);
		const image = screen.getByRole('img', { name: /test image/i });

		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', defaultProps.imgUrl);
		expect(image).toHaveAttribute('width', '16');
		expect(image).toHaveAttribute('height', '16');
		expect(image).toHaveAttribute('alt', defaultProps.alt);
	});

	it('відображає абзац з правильними текстом і назвами класів', () => {
		render(<ContentMetrics {...defaultProps} />);
		const paragraph = screen.getByText(defaultProps.value);

		expect(paragraph).toBeInTheDocument();
		expect(paragraph).toHaveClass(defaultProps.textStyles as string);
		expect(paragraph).toHaveClass('flex items-center gap-1');
	});

	it('відображає span з правильними заголовком і назвами класів', () => {
		render(<ContentMetrics {...defaultProps} />);
		const span = screen.getByText(defaultProps.title);

		expect(span).toBeInTheDocument();
		expect(span).toHaveClass('small-regular line-clamp-1');
	});

	it('застосовує додатковий клас до зображення, якщо надано атрибут href', () => {
		const propsWithHref = { ...defaultProps, href: 'https://example.com' };
		render(<ContentMetrics {...propsWithHref} />);
		const image = screen.getByRole('img', { name: /test image/i });

		expect(image).toHaveClass('rounded-full');
	});

	it('застосовує додатковий клас до span, якщо isAuthor = true', () => {
		const propsWithAuthor = { ...defaultProps, isAuthor: true };
		render(<ContentMetrics {...propsWithAuthor} />);
		const span = screen.getByText(defaultProps.title);

		expect(span).toHaveClass('max-sm:hidden');
	});
});
