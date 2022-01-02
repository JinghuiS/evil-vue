import {
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  // onServerPrefetch,
  onUnmounted,
  onUpdated
} from 'vue'

export const $LifecycleHook: any = {
  beforeMount: onBeforeMount,
  mounted: onMounted,
  beforeUpdate: onBeforeUpdate,
  updated: onUpdated,
  beforeUnmount: onBeforeUnmount,
  unmounted: onUnmounted,
  errorCaptured: onErrorCaptured,
  renderTracked: onRenderTracked,
  renderTriggered: onRenderTriggered,
  activated: onActivated,
  deactivated: onDeactivated
}
export function getLifecycle(proto: any) {
  const Prototype = Object.getPrototypeOf(proto)
  Object.getOwnPropertyNames(Prototype).forEach((key) => {
    Object.getOwnPropertyNames($LifecycleHook).forEach((lifecycle) => {
      if (key === lifecycle) {
        return $LifecycleHook[lifecycle](() => proto[key]())
      }
    })
  })
}
