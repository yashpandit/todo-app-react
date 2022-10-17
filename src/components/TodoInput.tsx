import { ChangeEvent, FormEvent, useRef } from 'react';
import uuid from 'react-uuid';
import { Todo } from './types';
import './styles/TodoInput.css';

type TodoInputProps = {
  onAddTodo: (newTodo: Todo) => void;
};

const TodoInput = (props: TodoInputProps) => {
  const { onAddTodo } = props;

  /**
   * using ref here instead of useState
   * as there is no need to re-render on value change
   */
  const todoInputRef = useRef<HTMLInputElement>(null);

  const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (todoInputRef.current) {
      todoInputRef.current.value = e.target.value;
    }
  };

  const handleTodoSubmit = (e: FormEvent) => {
    e.preventDefault();

    onAddTodo({
      title: todoInputRef.current?.value || '',
      isCompleted: false,
      id: uuid(),
    });

    if (todoInputRef.current) {
      todoInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleTodoSubmit}>
      <input
        ref={todoInputRef}
        type='text'
        name='todo-input'
        onChange={handleTodoChange}
        placeholder='Create a new todo..'
        className='todo-input'
      />
    </form>
  );
};

export default TodoInput;
