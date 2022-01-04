import { InjectorKey } from 'packages/module'
import { h, inject, provide } from 'vue'
import { RouterView } from 'vue-router'

export default function ModuleEmptyComponent(moduleConfig: any) {
    return class Empty {
        static __vccOpts__value?: any
        static get __vccOpts() {
            const CompConstructor = this as unknown
            if (this.__vccOpts__value) return this.__vccOpts__value
            return (this.__vccOpts__value = {
                setup: () => {
                    const parent: any = inject(InjectorKey)
                    const module = moduleConfig
                    module.providers.push(CompConstructor)
                    const childInject = parent.resolveAndCreateChild([
                        ...module.providers,
                        ...module.startupModules
                    ])

                    childInject.get(CompConstructor)
                    provide(InjectorKey, childInject)

                    return () =>
                        moduleConfig.bootstrap ? (
                            h(moduleConfig.bootstrap)
                        ) : (
                            <RouterView />
                        )
                }
            })
        }
        constructor() {}
    }
}
