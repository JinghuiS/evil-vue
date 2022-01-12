import { computed } from 'vue'
import { DecoratorHanlder } from '../types'
import { getProtoMetadata } from '../utils/helper'

interface ComputedItem {
    key: string | symbol
    desc: PropertyDescriptor
}

const MetadataKey = Symbol('Computed')
export function Computed(): MethodDecorator {
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
    const list: ComputedItem[] = getProtoMetadata(targetThis, MetadataKey, true)
    if (!list || !list.length) return
    for (const item of list) {
        if (setupReturn) {
            const desc = item.desc
            setupReturn[item.key] = computed({
                get: () => desc.get?.call(targetThis),
                set: (v: any) => desc.set?.call(targetThis, v)
            })
            Object.defineProperty(targetThis, item.key, {
                enumerable: desc?.enumerable,
                configurable: true,
                get() {
                    return setupReturn[item.key]
                },
                set(v: any) {
                    setupReturn[item.key].value = v
                }
            })
        } else {
            const desc = item.desc
            const keyVal = computed({
                get: () => desc.get?.call(targetThis),
                set: (v: any) => desc.set?.call(targetThis, v)
            })
            Object.defineProperty(targetThis, item.key, {
                enumerable: desc?.enumerable,
                configurable: true,
                get() {
                    return keyVal.value
                },
                set(v: any) {
                    keyVal.value = v
                }
            })
        }
    }
}

export const ComputedHandler: DecoratorHanlder = {
    key: 'Computed',
    handler
}
