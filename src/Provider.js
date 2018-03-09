import { isValid as validStoreShape } from './share/store'

export const Provider = function (store) {
  if (!validStoreShape(store)) {
    throw new TypeError('Store is invalid or not provider')
  }

  return function (App) {
    if (typeof App === 'function') {
      Object.defineProperty(App.prototype, 'store', { get: () => store })
      return App
    }

    return Object.assign({}, App, { store })
  }
}
