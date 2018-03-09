export const same = function (array, target) {
  return array.filter((item) => target.indexOf(item) !== -1)
}
