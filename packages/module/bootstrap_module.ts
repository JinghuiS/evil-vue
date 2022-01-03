import { Provider, ReflectiveInjector } from 'injection-js'
import { VueModuleScanner } from './scanner'

export function bootstrapModule(Module: any, ParentModule: ReflectiveInjector) {
    const scanner = new VueModuleScanner()

    const { providers, startupModules } = scanner.scanModule(Module)

    // const { providers, vueModules } = analysisModule(Module);
    const childRootInjector = ReflectiveInjector.resolveAndCreate(
        [...(providers || []), ...startupModules],
        ParentModule
    )

    startupModules.map((sm: Provider) => {
        childRootInjector.get(sm, null)
    })

    return childRootInjector
}
