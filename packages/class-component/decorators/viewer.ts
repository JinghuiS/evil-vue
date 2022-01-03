import { ref } from 'vue'
import { DecoratorHanlder } from '../types'
import { getProtoMetadata } from '../utils/helper'

export const MetadataKey = Symbol('Viewer')
/** vue ref No need to use .value */
export function Viewer(): PropertyDecorator {
    return function (target: any, key: string | symbol) {
        let list: (string | symbol)[] =
            Reflect.getMetadata(MetadataKey, target) || []
        list = list.slice()
        const hasItem = list.find((k) => k === key)
        if (!hasItem) list.push(key)
        Reflect.defineMetadata(MetadataKey, list, target)
    }
}
function handler(targetThis: Record<any, any>, setupReturn?: any) {
    const list: string[] = getProtoMetadata(targetThis, MetadataKey)

    if (!list || !list.length) return

    if (!setupReturn) {
        for (const item of list) {
            const keyVal = ref(targetThis[item])
            Object.defineProperty(targetThis, item, {
                enumerable: true,
                configurable: true,
                get() {
                    return keyVal.value
                },
                set(v) {
                    keyVal.value = v
                }
            })
        }
    } else {
        for (const item of list) {
            setupReturn[item] = ref(targetThis[item])
            Object.defineProperty(targetThis, item, {
                enumerable: true,
                configurable: true,
                get() {
                    return setupReturn[item].value
                },
                set(v) {
                    setupReturn[item].value = v
                }
            })
        }
    }
}

export const ViewerHandler: DecoratorHanlder = {
    key: 'Viewer',
    handler
}
