import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NoResult } from './NoResult';
import { NoResultProps } from './NoResult.interface';

describe('NoResult Компонент', () => {
	const testProps: NoResultProps = {
		title: 'Немає питань для відображення',
		description:
			'Не будьмо мовчунами! 🚀 Запитай щось та розпочни обговорення. Твоє питання може стати чимось важливим, чого навчаться інші. Долучайся! 💡',
		link: '/ask-question',
		linkTitle: 'Запитай',
	};

	it('коректно рендериться', () => {
		render(<NoResult {...testProps} />);
	});

	it('рендерить заголовок правильно', () => {
		render(<NoResult {...testProps} />);
		const titleElement = screen.getByText(testProps.title);
		expect(titleElement).toBeInTheDocument();
	});

	it('рендерить опис правильно', () => {
		render(<NoResult {...testProps} />);
		const descriptionElement = screen.getByText(testProps.description);
		expect(descriptionElement).toBeInTheDocument();
	});

	it('рендерить посилання правильно', () => {
		render(<NoResult {...testProps} />);
		const linkElement = screen.getByRole('link');
		expect(linkElement).toBeInTheDocument();
		expect(linkElement.getAttribute('href')).toBe(testProps.link);
	});
});
