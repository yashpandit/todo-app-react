export type Todo = {
  title: string;
  isCompleted: boolean;
  id: string;
};

export enum Filter {
  ALL,
  ACTIVE,
  COMPLETED,
}

export type FilterOption = {
  id: string;
  label: string;
  value: Filter;
};

export default null;
