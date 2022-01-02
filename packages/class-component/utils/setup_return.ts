export const $internalHooks = [
  '$props',
  'props',
  'context',
  'render',
  'resolveComponent',
  '__vccOpts__value',
  '__vccOpts',
  'constructor',
  'components',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeUnmount',
  'unmounted',
  'errorCaptured',
  'renderTracked',
  'renderTriggered',
  'activated',
  'deactivated'
]

export function getSetupReturn(proto: any) {
  const setupReturn: any = {}

  const Prototype = Object.getPrototypeOf(proto)
  Object.getOwnPropertyNames(Prototype).forEach((key) => {
    if ($internalHooks.indexOf(key) > -1) {
      return
    }
    // if (isType(Prototype[key])) {
    //   return (setupReturn[key] = Autobind()(Prototype[key]));
    // }
    setupReturn[key] = Prototype[key]
  })
  const Proto = Object.getOwnPropertyDescriptors(proto)

  Object.getOwnPropertyNames(Proto).forEach((key) => {
    if ($internalHooks.indexOf(key) > -1) {
      return
    }
    // Reflect.defineMetadata('design:paramtypes');
    // console.log(
    //   typeof Proto[key].value.constructor,
    //   Proto[key].value.constructor
    // );

    setupReturn[key] = Proto[key].value
  })

  return setupReturn
}
