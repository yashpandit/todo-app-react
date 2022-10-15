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
          <input type='checkbox' checked={isCompleted} onChange={() => onToggleTodo(id)} />
          <span>{title}</span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
