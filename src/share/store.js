export const StoreShape = ['subscribe', 'dispatch', 'getState']

export const isValid = function (store) {
  if (typeof store !== 'object') {
    return false
  }

  const missingProps = StoreShape.filter((prop) => !store.hasOwnProperty(prop))
  return missingProps.length === 0
}
