import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

const todosStub: string[] = [
  'create a github repo',
  'finish todo-app project',
  'showcase it on github',
  'get feedback',
  'get a lot of github stars',
];

const addTodo = (title: string) => {
  const todoInput = screen.getByRole('textbox');
  userEvent.type(todoInput, `${title}{enter}`);
};

const clickTodo = (selector: number) => {
  const todo = screen.getAllByRole('checkbox')[selector - 1];
  userEvent.click(todo);
};

const getAllTodos = () => screen.getAllByRole('listitem');

describe('App', () => {
  beforeEach(() => {
    render(<App />);
    todosStub.forEach((todo) => {
      addTodo(todo);
    });
  });

  it('should add a todo', () => {
    expect(getAllTodos().length).toBe(5);
  });

  it('should show count of todos to be completed', () => {
    expect(screen.getByText('5 items left')).toBeInTheDocument();

    // complete a todo by checking it off
    clickTodo(1);
    expect(screen.getByText('4 items left')).toBeInTheDocument();
  });

  it('should un-complete a todo when unchecked', () => {
    expect(screen.getByText('5 items left')).toBeInTheDocument();

    // complete a todo by checking it off
    clickTodo(1);
    expect(screen.getByText('4 items left')).toBeInTheDocument();

    // un-complete a todo by clicking it again
    clickTodo(1);
    expect(screen.getByText('5 items left')).toBeInTheDocument();
  });

  it('should show active todos when active filter is selected', () => {
    expect(getAllTodos().length).toBe(5);

    clickTodo(1); // check first todo
    clickTodo(2); // check second todo
    userEvent.click(screen.getByLabelText('Active'));

    expect(getAllTodos().length).toBe(3);
  });

  it('should show completed todos when completed filter is selected', () => {
    expect(getAllTodos().length).toBe(5);

    clickTodo(1); // check first todo
    clickTodo(2); // check second todo
    userEvent.click(screen.getByLabelText('Completed'));

    expect(getAllTodos().length).toBe(2);
  });

  it('should clear completed todos when clear completed button is clicked', () => {
    expect(getAllTodos().length).toBe(5);

    clickTodo(1); // check first todo
    clickTodo(2); // check second todo
    userEvent.click(screen.getByText('Clear completed'));

    expect(getAllTodos().length).toBe(3);
  });
});
