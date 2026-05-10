export type Listener<T> = (data: T) => void;

export class Observable<T> {
  private listeners: Listener<T>[] = [];
  private state: T;

  constructor(initialState: T) {
    this.state = initialState;
  }

  // Permite que un componente se "anote" para recibir cambios
  subscribe(listener: Listener<T>) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notifica a todos los suscritos y actualiza el estado
  notify(newState: T) {
    this.state = newState;
    this.listeners.forEach(listener => listener(this.state));
  }

  getState(): T {
    return this.state;
  }
}