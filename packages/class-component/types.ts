import { InjectionKey, Prop, SetupContext, VNodeChild } from 'vue'

export interface VueComponentStaticContructor {
    new (...args: any[]): any

    /** 组件属性vue描述 */
    defaultProps?: any
    /** 组件是否回退attrs */
    inheritAttrs?: boolean
    /** 组件使用的指令 */
    directives?: any

    /** 自定义解析组件 */
    resolveComponent?: any
    [prop: string]: any
}
/**vue lifecycle implements */
export interface VueLifecycle {
    beforeMount?: () => void
    mounted?: () => void
    beforeUpdate?: () => void
    updated?: () => void
    beforeUnmount?: () => void
    unmounted?: () => void
    errorCaptured?: () => void
    renderTracked?: () => void
    renderTriggered?: () => void
    activated?: () => void
    deactivated?: () => void
}
/**Decorator handler*/
export interface DecoratorHanlder {
    key: string
    handler: (targetThis: any, setupReturn?: any) => void
}

type DefaultSlots = {
    default(): VNodeChild
}

type MixDefaultSlots<T extends {}> = 'default' extends keyof T
    ? {}
    : DefaultSlots

export type WithVSlots<T extends {}> = {
    'v-slots'?: 'slots' extends keyof T
        ? Partial<
              T['slots'] & { $stable: boolean } & MixDefaultSlots<T['slots']>
          >
        : Partial<{ $stable: boolean; default(): VNodeChild }>
}

export type WithSlotTypes<T extends {}> = Omit<SetupContext, 'slots'> & {
    slots: 'slots' extends keyof T
        ? Partial<T['slots'] & MixDefaultSlots<T['slots']>>
        : Partial<{ default(): VNodeChild }>
}

type ModelProps<T extends {}> = Exclude<
    {
        [Prop in keyof T]: T extends {
            [k in Prop as `onUpdate:${k & string}`]?: any
        }
            ? Prop
            : never
    }[keyof T],
    undefined
>
export type TransformModelValue<T extends {}> =
    'v-model:modelValue' extends keyof T
        ? Omit<T, 'v-model:modelValue'> & {
              ['v-model']?: T['v-model:modelValue']
          }
        : T

export type WithVModel<
    T extends {},
    U extends keyof T = ModelProps<T>
> = TransformModelValue<{
    [k in U as `v-model:${k & string}`]?: T[k] | [T[k], string[]]
}>
