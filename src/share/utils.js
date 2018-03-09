export const isEqual = function (source, target) {
  if (source === target) {
    return true
  }

  let sProps = Object.getOwnPropertyNames(source)
  let tPorps = Object.getOwnPropertyNames(target)

  if (sProps.length !== tPorps.length) {
    return false
  }

  for (let i = sProps.length; i --;) {
    let name = sProps[i]

    // If values of same property are not equal,
    // objects are not equivalent
    if (source[name] !== target[name]) {
      return false
    }
  }

  return true
}
