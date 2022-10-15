import { Todo } from './types';

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
};

const TodoList = (props: TodoListProps) => {
  const { todos, onToggleTodo } = props;

  return (
    <ul>
      {todos.map(({ isCompleted, title, id }) => (
        <li key={id}>
          <input id={id} type='checkbox' checked={isCompleted} onChange={() => onToggleTodo(id)} />
          <label htmlFor={id} style={isCompleted ? { textDecoration: 'line-through' } : {}}>
            {title}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
