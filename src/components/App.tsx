import React, { useState } from 'react';
import TodoFilters from './TodoFilters';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { Filter, Todo } from './types';
import './styles/App.css';

const completedTodo = ({ isCompleted }: Todo) => isCompleted;
const notCompletedTodo = ({ isCompleted }: Todo) => !isCompleted;

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const onAddTodo = (newTodo: Todo) => {
    setTodoList((prev) => [...prev, newTodo]);
  };

  const onToggleTodo = (todoId: string) => {
    const index = todoList.findIndex(({ id }) => id === todoId);

    if (index === -1) {
      return;
    }

    const newTodos = todoList.map((item, idx) => {
      if (index === idx) {
        return {
          ...item,
          isCompleted: !item.isCompleted,
        };
      }

      return item;
    });
    setTodoList(newTodos);
  };

  const clearCompletedTodos = () => setTodoList((prev) => prev.filter(notCompletedTodo));

  const onFilterChange = (newFilter: Filter) => setFilter(newFilter);

  const filteredTodos = (() => {
    if (filter === Filter.ACTIVE) {
      return todoList.filter(notCompletedTodo);
    }

    if (filter === Filter.COMPLETED) {
      return todoList.filter(completedTodo);
    }

    return todoList;
  })();

  return (
    <div className='app-container'>
      <TodoInput onAddTodo={onAddTodo} />
      <TodoList todos={filteredTodos} onToggleTodo={onToggleTodo} />
      <div className='todo-actions-container'>
        <p>{filteredTodos.filter(notCompletedTodo).length} items left</p>
        <TodoFilters currentFilter={filter} updateFilter={onFilterChange} />
        <button className='clear-completed-btn' onClick={clearCompletedTodos}>
          Clear completed
        </button>
      </div>
    </div>
  );
}

export default App;
