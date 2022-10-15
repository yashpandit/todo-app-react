import { Fragment } from 'react';
import { Filter } from './types';

type TodoFiltersProps = {
  currentFilter: Filter;
  updateFilter: (newFilter: Filter) => void;
};

const filters = [
  {
    label: 'All',
    value: Filter.ALL,
  },
  {
    label: 'Active',
    value: Filter.ACTIVE,
  },
  {
    label: 'Completed',
    value: Filter.COMPLETED,
  },
];

const TodoFilters = (props: TodoFiltersProps) => {
  const { currentFilter, updateFilter } = props;

  return (
    <div>
      {filters.map(({ label, value }) => (
        <Fragment key={value}>
          <input
            type='radio'
            name='todo-filter'
            checked={value === currentFilter}
            onChange={() => updateFilter(value)}
          />
          <label>{label}</label>
        </Fragment>
      ))}
    </div>
  );
};

export default TodoFilters;
