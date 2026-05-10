import { Observable } from './Observable';
import { Usuario } from '../models/Usuario';

export interface UserState {
  user: Usuario | null;
  isLogged: boolean;
}

const initialState: UserState = {
  user: null,
  isLogged: false
};

export const userObserver = new Observable<UserState>(initialState);