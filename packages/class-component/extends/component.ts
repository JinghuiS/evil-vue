import { Injectable } from 'packages'
import { VNodeProps } from 'vue'
import { getComponentOptions } from '../decorators/component'

import { useProps, useCtx, getEmitsFromProps } from '../utils/helper'
import { getSetupReturn } from '../utils/setup_return'
import { getLifecycle } from '../utils/lifecycle'
import {
    WithVModel,
    WithVSlots,
    DecoratorHanlder,
    VueComponentStaticContructor,
    WithSlotTypes
} from '../types'

//Decorator hander
import { PropHandler, creatProps } from '../decorators/prop'
import { ViewerHandler } from '../decorators/viewer'
import { LinkHandler } from '../decorators/link'
import { ComputedHandler } from '../decorators/computed'

type VueComponentProps<T extends {}> = Omit<T, 'slots'> &
    WithVModel<T> &
    WithVSlots<T> &
    VNodeProps &
    Record<string, unknown>

@Injectable()
export abstract class VueComponent<T extends {} = {}> {
    static __hmrId?: string
    /** Decorator hander */
    static handler: DecoratorHanlder[] = [
        ViewerHandler,
        PropHandler,
        LinkHandler,
        ComputedHandler
    ]
    /** 是否自定义解析组件 */
    static resolveComponent?: any
    static __vccOpts__value?: any
    /** 组件option定义,vue3遇到类组件会从此属性获取组件的option */

    static get __vccOpts() {
        if (this.__vccOpts__value) return this.__vccOpts__value
        const CompConstructor = this as unknown as VueComponentStaticContructor
        const componentOptions = getComponentOptions(CompConstructor)

        return (this.__vccOpts__value = {
            ...CompConstructor,
            ...componentOptions,
            directives: CompConstructor.directives,
            // 放到emits的on函数会自动缓存
            emits: (CompConstructor.emits || []).concat(
                getEmitsFromProps(componentOptions.props || {})
            ),

            props: creatProps(CompConstructor),
            setup: (props: any, ctx: any) => {
                let instance: any
                let setupReturn: any

                if (CompConstructor.resolveComponent) {
                    instance = CompConstructor.resolveComponent(CompConstructor)
                } else {
                    instance = new CompConstructor()
                }

                getLifecycle(instance)
                if (instance.render) {
                    setupReturn = instance.render.bind(instance)
                } else {
                    setupReturn = { ...instance, ...instance.setupReturn }
                }
                return setupReturn
            }
        })
    }

    //   /** 主要给jsx提示用 */
    get $props() {
        return this.props
    }
    /** 组件属性 */
    public props: VueComponentProps<T>
    /** 组件上下文 */
    public context: WithSlotTypes<T>

    public setupReturn: any = {}
    constructor() {
        this.props = useProps<VueComponentProps<T>>()
        this.context = useCtx() as WithSlotTypes<T>
        this.context.expose(this)
        //@ts-ignore
        if (this.render) {
            VueComponent.handler.forEach((handler) => handler.handler(this))
        } else {
            this.setupReturn = getSetupReturn(this)
            VueComponent.handler.forEach((handler) =>
                handler.handler(this, this.setupReturn)
            )
        }
    }
}
