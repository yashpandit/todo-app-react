import { Fragment } from 'react';
import { Filter, FilterOption } from './types';
import './styles/TodoFilters.css';

type TodoFiltersProps = {
  currentFilter: Filter;
  updateFilter: (newFilter: Filter) => void;
};

const filters: FilterOption[] = [
  {
    id: '1',
    label: 'All',
    value: Filter.ALL,
  },
  {
    id: '2',
    label: 'Active',
    value: Filter.ACTIVE,
  },
  {
    id: '3',
    label: 'Completed',
    value: Filter.COMPLETED,
  },
];

const TodoFilters = (props: TodoFiltersProps) => {
  const { currentFilter, updateFilter } = props;

  return (
    <div>
      {filters.map(({ id, label, value }) => (
        <Fragment key={id}>
          <input
            type='radio'
            name='todo-filter'
            className='filter-option'
            checked={value === currentFilter}
            onChange={() => updateFilter(value)}
            id={id}
          />
          <label
            className={`${value === currentFilter ? 'filter-selected' : ''} filter-label`}
            htmlFor={id}
          >
            {label}
          </label>
        </Fragment>
      ))}
    </div>
  );
};

export default TodoFilters;
