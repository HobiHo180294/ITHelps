import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NoResult from './NoResult';
import { NoResultProps } from './NoResult.interface';

describe('NoResult Component', () => {
	const testProps: NoResultProps = {
		title: 'Немає питань для відображення',
		description:
			'Не будьмо мовчунами! 🚀 Запитай щось та розпочни обговорення. Твоє питання може стати чимось важливим, чого навчаться інші. Долучайся! 💡',
		link: '/ask-question',
		linkTitle: 'Запитай',
	};

	it('renders correctly', () => {
		render(<NoResult {...testProps} />);
	});

	it('renders title correctly', () => {
		render(<NoResult {...testProps} />);
		const titleElement = screen.getByText(testProps.title);
		expect(titleElement).toBeInTheDocument();
	});

	it('renders description correctly', () => {
		render(<NoResult {...testProps} />);
		const descriptionElement = screen.getByText(testProps.description);
		expect(descriptionElement).toBeInTheDocument();
	});

	it('renders link correctly', () => {
		render(<NoResult {...testProps} />);
		const linkElement = screen.getByRole('link');
		expect(linkElement).toBeInTheDocument();
		expect(linkElement.getAttribute('href')).toBe(testProps.link);
	});
});
