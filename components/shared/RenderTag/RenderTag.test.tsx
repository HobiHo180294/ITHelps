// Імпортування необхідних модулів
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { RenderTag } from './RenderTag';
import { RenderTagProps } from './RenderTag.interface';
import { renderTagStyled } from './RenderTag.styles';

describe('RenderTag component', () => {
	const testProps: RenderTagProps = {
		_id: '123',
		name: 'JavaScript',
		showCount: true,
		totalQuestions: 42,
	};

	test("коректно відображається з обов'язковими властивостями", () => {
		render(<RenderTag {...testProps} />);

		const linkElement = screen.getByRole('link');
		expect(linkElement).toHaveAttribute('href', '/tags/123');

		const badgeElement = screen.getByText('JavaScript');
		expect(badgeElement).toBeInTheDocument();
	});

	test('відображає загальну кількість питань, коли лічильник дорівнює true', () => {
		render(<RenderTag {...testProps} />);

		const countElement = screen.getByText('42');
		expect(countElement).toBeInTheDocument();
	});

	test('не відображає загальну кількість питань, коли лічильник дорівнює false', () => {
		const propsWithoutCount: RenderTagProps = {
			...testProps,
			showCount: false,
		};

		render(<RenderTag {...propsWithoutCount} />);

		const countElement = screen.queryByText('42');
		expect(countElement).not.toBeInTheDocument();
	});

	test('посилання має правильний клас', () => {
		render(<RenderTag {...testProps} />);

		const linkElement = screen.getByRole('link');
		expect(linkElement).toHaveClass(renderTagStyled.link);
	});

	test('значок має правильний клас', () => {
		render(<RenderTag {...testProps} />);

		const badgeElement = screen.getByText('JavaScript');
		expect(badgeElement).toHaveClass(renderTagStyled.nameBadge);
	});

	test('абзац має правильний клас, коли лічильник дорівнює true', () => {
		render(<RenderTag {...testProps} />);

		const countElement = screen.getByText('42');
		expect(countElement).toHaveClass(renderTagStyled.showCountParagraph);
	});
});
