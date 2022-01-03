import { DecoratorHanlder } from '../types'

export const PropMetadataKey = Symbol('__Component_Prop')

interface PropOptions {
    default?: any
    type?: any
}

export function Prop(propOptions?: PropOptions): PropertyDecorator {
    return function (target, key: string | symbol) {
        // let list: (string | symbol)[] = [];
        // list = list.slice();
        // const hasItem = list.find((k) => k === key);
        // if (!hasItem) list.push(key);

        let list: any[] =
            Reflect.getMetadata(PropMetadataKey, target.constructor) || []
        list = list.slice()

        const hasItem = list.find((k) => k === key)
        if (!hasItem) list.push({ key, ...propOptions })
        Reflect.defineMetadata(PropMetadataKey, list, target.constructor)
        Reflect.defineMetadata(PropMetadataKey, list, target)
    }
}

export function creatProps(targetThis: Record<any, any>) {
    const list: any[] = Reflect.getMetadata(PropMetadataKey, targetThis) || []
    let creatPropsObj: any = {}
    for (const item of list) {
        creatPropsObj[item.key] = {
            type: item.type || [String, Number, Object, Function, Boolean],
            default: item.default
        }
    }
    return creatPropsObj
}

function handler(targetThis: Record<any, any>) {
    const list: any[] = Reflect.getMetadata(PropMetadataKey, targetThis) || []
    if (!list || !list.length) return
    for (const item of list) {
        Object.defineProperty(targetThis, item.key, {
            enumerable: true,
            configurable: true,
            get() {
                return targetThis.props[item.key]
            }
        })
    }
}

export const PropHandler: DecoratorHanlder = {
    key: 'Prop',
    handler
}
