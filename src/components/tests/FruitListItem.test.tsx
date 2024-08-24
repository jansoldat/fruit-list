/**
 * @vitest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { FruitListItem } from '../FruitListItem';

import { afterEach, describe, expect, it, vi } from 'vitest';

// Mocking the useTranslation hook
vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => key,
	}),
}));

const mockFruit = {
	id: 1,
	genus: 'genus',
	order: 'order',
	name: 'Apple',
	family: 'family',
	nutritions: {
		carbohydrates: 1,
		fat: 2,
		protein: 3,
		sugar: 4,
		calories: 52,
	},
};

const selectedOneTime = new Map([[1, 1]]);
const selectedNineTimes = new Map([[1, 9]]);
const emptySelected = new Map<number, number>();

const onDeleteMock = vi.fn();
const onAddMock = vi.fn();

describe('FruitListItem', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('renders the fruit name and calories', () => {
		render(
			<FruitListItem
				fruit={mockFruit}
				selected={emptySelected}
				onAdd={onAddMock}
				onDelete={onDeleteMock}
			/>,
		);

		const deleteButton = screen.queryByRole('button', { name: /delete/i });

		expect(deleteButton).toBeNull();
		expect(screen.getByText('Apple')).toBeInTheDocument();
		expect(screen.getByText('(52 kcal)')).toBeInTheDocument();
	});

	it('renders the Counter component when count is greater than 0', () => {
		render(
			<FruitListItem
				fruit={mockFruit}
				selected={selectedOneTime}
				onAdd={onAddMock}
				onDelete={onDeleteMock}
			/>,
		);

		expect(screen.getByText('1')).toBeInTheDocument();
	});

	it('calls onAdd when the "Add" button is clicked', async () => {
		render(
			<FruitListItem
				fruit={mockFruit}
				selected={selectedOneTime}
				onAdd={onAddMock}
				onDelete={onDeleteMock}
			/>,
		);

		const addButton = screen.getByRole('button', { name: /Add/i });
		await userEvent.click(addButton);

		expect(onAddMock).toHaveBeenCalledTimes(1);
	});

	it('calls onDelete when the delete button is clicked', async () => {
		render(
			<FruitListItem
				fruit={mockFruit}
				selected={selectedOneTime}
				onAdd={onAddMock}
				onDelete={onDeleteMock}
			/>,
		);

		const deleteButton = screen.getByRole('button', { name: /delete/i });
		await userEvent.click(deleteButton);

		expect(onDeleteMock).toHaveBeenCalledTimes(1);
	});

	it('disables the add button when count is 10 or more', () => {
		const modifiedMockFruit = { ...mockFruit, count: 10 };

		render(
			<FruitListItem
				fruit={modifiedMockFruit}
				selected={selectedNineTimes}
				onAdd={onAddMock}
				onDelete={onDeleteMock}
			/>,
		);

		const addButton = screen.getByRole('button', { name: /add/i });
		expect(addButton).toBeDisabled();
	});
});
