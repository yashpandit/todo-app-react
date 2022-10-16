import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TodoInput from '../TodoInput';

const mockOnAddTodo = jest.fn();

describe('TodoInput', () => {
  it('should reset the input on submit', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    const todoInput = screen.getByRole('textbox');
    userEvent.type(todoInput, 'abc{enter}');

    expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
    expect(mockOnAddTodo).toHaveBeenCalledWith({
      id: expect.anything(),
      isCompleted: false,
      title: 'abc',
    });
    expect(todoInput.textContent).toBe('');
  });
});
