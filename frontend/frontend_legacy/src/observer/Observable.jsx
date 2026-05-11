export class Observable {
  #listeners = [];
  #state;

  constructor(initialState) {
    this.#state = initialState;
  }

  // Permite que un componente se "anote" para recibir cambios
  subscribe(listener) {
    this.#listeners.push(listener);
    return () => {
      this.#listeners = this.#listeners.filter(l => l !== listener);
    };
  }

  // Notifica a todos los suscritos y actualiza el estado
  notify(newState) {
    this.#state = newState;
    this.#listeners.forEach(listener => listener(this.#state));
  }

  getState() {
    return this.#state;
  }
}