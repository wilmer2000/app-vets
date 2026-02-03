export interface Resource<T> {
  data: T;
  loading: boolean;
  error: string | null;
}
