import { getCurrentInstance } from 'vue'
import { DecoratorHanlder } from '../types'
import { getProtoMetadata } from '../utils/helper'

const MetadataKey = Symbol('Link')
export function Link(): PropertyDecorator {
    return function (target: any, key: string | symbol) {
        let list: (string | symbol)[] =
            Reflect.getMetadata(MetadataKey, target) || []
        list = list.slice()
        const hasItem = list.find((k) => k === key)
        if (!hasItem) list.push(key)
        Reflect.defineMetadata(MetadataKey, list, target)
    }
}

function handler(targetThis: Record<any, any>) {
    const list: (string | symbol)[] = getProtoMetadata(targetThis, MetadataKey)
    if (!list || !list.length) return
    for (const item of list) {
        const instance = getCurrentInstance()
        Object.defineProperty(targetThis, item, {
            enumerable: true,
            configurable: true,
            get() {
                return instance?.refs[item as string]
            }
        })
    }
}

export const LinkHandler: DecoratorHanlder = {
    key: 'Link',
    handler
}
