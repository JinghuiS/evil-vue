export const isDate = (val: unknown): val is Date => val instanceof Date
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return !null && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
export const isArray = <T = any>(val: unknown): val is Array<T> => {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(val)
  } else {
    return Object.prototype.toString.call(val) === '[object Array]'
  }
}
