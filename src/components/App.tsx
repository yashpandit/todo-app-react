import React, { useState } from 'react';
import TodoFilters from './TodoFilters';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { Filter, Todo } from './types';

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

  const clearCompletedTodos = () =>
    setTodoList((prev) => prev.filter(({ isCompleted }) => !isCompleted));

  const onFilterChange = (newFilter: Filter) => setFilter(newFilter);

  const filteredTodos = (() => {
    if (filter === Filter.ACTIVE) {
      return todoList.filter(({ isCompleted }) => !isCompleted);
    }

    if (filter === Filter.COMPLETED) {
      return todoList.filter(({ isCompleted }) => isCompleted);
    }

    return todoList;
  })();

  return (
    <div>
      <TodoInput onAddTodo={onAddTodo} />
      <TodoList todos={filteredTodos} onToggleTodo={onToggleTodo} />
      <div>
        <div>{filteredTodos.filter(({ isCompleted }) => !isCompleted).length}</div>
        <TodoFilters currentFilter={filter} updateFilter={onFilterChange} />
        <button onClick={clearCompletedTodos}>Clear completed</button>
      </div>
    </div>
  );
}

export default App;
