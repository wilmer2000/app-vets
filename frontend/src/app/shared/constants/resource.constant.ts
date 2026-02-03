import { Resource } from '../interfaces/resource.interface';

export const RESOURCE_INITIAL_STATE = (): Resource<any> => ({
    loading: true,
    data: null,
    error: null
})
