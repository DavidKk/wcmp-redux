import { isEqual } from './share/utils'
import { isValid as validStoreShape } from './share/store'
import { same } from './share/array'
import { wrapActionCreators } from './wrapActionCreators.js'

const defaultMapStateToProps = (state) => ({})
const defaultMapDispatchToProps = (dispatch) => ({ dispatch })

export const connect = function (mapStateToProps = defaultMapStateToProps, mapDispatchToProps = defaultMapDispatchToProps) {
  const shouldSubscribe = Boolean(mapStateToProps)

  if (!mapStateToProps) {
    mapStateToProps = defaultMapStateToProps
  }

  if (typeof mapDispatchToProps !== 'function') {
    if (mapDispatchToProps) {
      mapDispatchToProps = wrapActionCreators(mapDispatchToProps)
    }
  }

  return function wrapWithConnect (PageComponent = {}) {
    const originalHandleOnload = PageComponent.prototype.onLoad || PageComponent.onLoad
    const originalHandleUnload = PageComponent.prototype.onUnload || PageComponent.onUnload

    const handleChange = function (options) {
      if (!this.unsubscribe) {
        return
      }

      const state = this.store.getState()
      const mappedState = mapStateToProps(state, options)

      if (typeof this.onReceiveState === 'function') {
        if (this.onReceiveState(this._data || {}, mappedState) !== false) {
          this._data = mappedState
          this.setData(mappedState)
        }

        return
      }

      if (isEqual(this._data, mappedState)) {
        return
      }

      this._data = mappedState
      this.setData(mappedState)
    }

    const onLoad = function (options) {
      if (!this.store && validStoreShape(this.store)) {
        throw new TypeError('Store is not exists')
      }

      if (shouldSubscribe) {
        this.unsubscribe = this.store.subscribe(handleChange.bind(this, options))
        handleChange.call(this, options)
      }

      typeof originalHandleOnload === 'function' && originalHandleOnload.apply(this, arguments)
    }

    const onUnload = function () {
      typeof originalHandleUnload === 'function' && originalHandleUnload.apply(this, arguments)
      typeof this.unsubscribe === 'function' && this.unsubscribe()
      this.unsubscribe = undefined
    }

    let inherentAbility = { onLoad, onUnload }
    let App = getApp()
    let Store = App.store

    if (typeof App === 'undefined') {
      throw new Error('Connect did not use in entry file (root/app.js), please detect `getApp()` value')
    }

    if (typeof Store === 'undefined' || typeof Store.dispatch !== 'function') {
      throw new Error('Connect must be running after Provider, please detect `getApp().store` is generated')
    }

    let actions = mapDispatchToProps(Store.dispatch)
    let inherentkeys = Object.keys(inherentAbility)
    let dispatchKeys = Object.keys(actions)

    let conflictKeys = same(inherentkeys, dispatchKeys)
    if (conflictKeys.length === 2) {
      throw new TypeError(`${conflictKeys.join(',')} is exists and can not be overrided`)
    }

    if (typeof PageComponent === 'function') {
      Object.defineProperty(PageComponent.prototype, 'store', { get: () => Store })
      Object.assign(PageComponent.prototype, actions, { onLoad, onUnload })
      return PageComponent
    }

    return Object.assign({}, PageComponent, actions, { onLoad, onUnload })
  }
}
