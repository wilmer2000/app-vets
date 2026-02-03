export interface FormSelectOpts {
  label?: string;
  value: any;
}

export type FormType =
  | 'input'
  | 'select'
  | 'checkbox'
  | 'password'
  | 'email'
  | 'date'
  | 'switch'
  | 'multi-select'
  | 'search-select'
  | 'number';
