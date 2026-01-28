import { Injectable, signal } from '@angular/core';
import { Resource } from '../interfaces/resource.interface';
import { RESOURCE_INITIAL_STATE } from '../constants/resource.constant';

@Injectable()
export class ResourceService<T> {
  private _data = signal<Resource<T>>({
    ...RESOURCE_INITIAL_STATE(),
  });
  data = this._data.asReadonly();

  setData(data: T): void {
    this._data.update((values) => {
      return {
        ...values,
        data,
      } as Resource<T>;
    });
  }

  setLoading(loading: boolean): void {
    this._data.update((data) => ({ ...data, loading }));
  }
}
