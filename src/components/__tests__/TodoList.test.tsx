import { render, screen } from '@testing-library/react';

import TodoList from '../TodoList';

const mockOnToggleTodo = jest.fn();

describe('TodoList', () => {
  it('should show empty state when there are no todos', () => {
    render(<TodoList todos={[]} onToggleTodo={mockOnToggleTodo} />);

    expect(screen.getByText('Add your first todo!')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem').length).toBe(0);
  });
});
