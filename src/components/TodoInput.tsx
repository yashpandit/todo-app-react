import { ChangeEvent, FormEvent, useRef } from 'react';
import uuid from 'react-uuid';
import { Todo } from './types';

type TodoInputProps = {
  onAddTodo: (newTodo: Todo) => void;
};

const TodoInput = (props: TodoInputProps) => {
  const { onAddTodo } = props;

  /**
   * using ref here instead of useState
   * as there is no need to re-render on value change
   */
  const todoInputRef = useRef<string>('');

  const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    todoInputRef.current = e.target.value;
  };

  const handleTodoSubmit = (e: FormEvent) => {
    e.preventDefault();

    onAddTodo({
      title: todoInputRef.current,
      isCompleted: false,
      id: uuid(),
    });
  };

  return (
    <form onSubmit={handleTodoSubmit}>
      <input
        type='text'
        name='todo-input'
        onChange={handleTodoChange}
        placeholder='Create a new todo..'
      />
    </form>
  );
};

export default TodoInput;
