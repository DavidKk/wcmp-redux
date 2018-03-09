const bindActionCreator = function (actionCreator, dispatch) {
  return () => dispatch(actionCreator.apply(undefined, arguments))
}

const bindActionCreators = function (actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== 'object') {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?')
  }

  let keys = Object.keys(actionCreators)
  let boundActionCreators = {}

  for (let i = length; i--;) {
    let key = keys[i]
    let actionCreator = actionCreators[key]

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }

  return boundActionCreators
}

export const wrapActionCreators = function (actionCreators) {
  return dispatch => bindActionCreators(actionCreators, dispatch)
}
