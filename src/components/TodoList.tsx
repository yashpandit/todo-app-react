import { Todo } from './types';
import './styles/TodoList.css';

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
};

const TodoList = (props: TodoListProps) => {
  const { todos, onToggleTodo } = props;

  if (!todos.length) {
    return <div>Add your first todo!</div>;
  }

  return (
    <ul className='list-container'>
      {todos.map(({ isCompleted, title, id }) => (
        <li key={id} className='list-item'>
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
