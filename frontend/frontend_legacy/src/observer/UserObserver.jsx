import { Observable } from './Observable';

const initialState = {
  user: null,
  isLogged: false
};

export const userObserver = new Observable(initialState);