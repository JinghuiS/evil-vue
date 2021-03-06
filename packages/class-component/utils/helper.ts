import { getCurrentInstance, SetupContext } from 'vue'
export function useProps<T>() {
    const instance = getCurrentInstance()
    return instance!.props as T
}
export function useCtx(): SetupContext {
    const instance = getCurrentInstance()
    // @ts-ignore
    return instance.setupContext
}
export function getCurrentApp() {
    return getCurrentInstance()?.appContext.app
}

export function getDeepOwnDescriptor(
    proto: any,
    key: string
): PropertyDescriptor | null {
    if (!proto) return null
    const desc = Reflect.getOwnPropertyDescriptor(proto, key)
    if (desc) return desc
    return getDeepOwnDescriptor(Reflect.getPrototypeOf(proto), key)
}
export function getProtoMetadata(
    target: any,
    key: symbol,
    returnDesc = false
): any[] {
    if (!target) return []
    const proto = Reflect.getPrototypeOf(target)
    if (!proto) return []
    let res: any[] = Reflect.getMetadata(key, proto) || []
    if (returnDesc) {
        res = res.map((k) => {
            if (typeof k === 'string') {
                return {
                    key: k,
                    desc: getDeepOwnDescriptor(proto, k)
                }
            }
            if (typeof k === 'object') {
                return {
                    key: k,
                    desc: getDeepOwnDescriptor(proto, k.key)
                }
            }
        })
    }
    return res
}
export function getEmitsFromProps(
    defaultProps: Record<string, any> | string[]
) {
    const keys = Array.isArray(defaultProps)
        ? defaultProps
        : Object.keys(defaultProps)
    const emits: string[] = []

    for (let key of keys) {
        if (!/^on/.test(key)) continue
        key = key.slice(2).replace(/Once$/, '')
        emits.push(key[0].toLowerCase() + key.slice(1))
    }
    return emits
}
