import { RouteRecordRaw } from 'vue-router'
import { RouterChildKey } from './router_config'
import { VueEvilRouterRaw } from './types'
import VueEvilRouterEmptyComponent from './components/empty.vue'
import { VueModuleScanner } from 'packages/module/scanner'
import { bootstrapModule, InjectorKey } from 'packages'
import { inject, provide } from 'vue'
import { Injectable } from 'injection-js'

function bindModule(module: any, component?: any) {
    const moduleScanner = new VueModuleScanner()
    const moduleConfig = moduleScanner.scanModule(module)
    let emptyComponent =
        moduleScanner.scanBootstrap(module) || VueEvilRouterEmptyComponent

    emptyComponent.resolveComponent = (t: any) => {
        const parent = inject<any>(InjectorKey, null)
        moduleConfig.providers.push(t)
        const injector = bootstrapModule(moduleConfig, parent)
        provide(InjectorKey, injector)
        return injector.get(t)
    }
    return { component: Injectable()(emptyComponent) }
}

function scannerRouterChildren(module: any) {
    const moduleScanner = new VueModuleScanner()
    const moduleConfig = moduleScanner.scanModule(module)
    let routerChild: VueEvilRouterRaw[] = []
    moduleConfig.providers.map((item) => {
        routerChild = Reflect.getOwnMetadata(
            RouterChildKey,
            item
        ) as VueEvilRouterRaw[]
    })
    return routerChild
}

export function scannerRoutes(routes: VueEvilRouterRaw[]) {
    return routes.map(({ loadChildren, children, component, ...route }) => {
        const _route: any = { ...route }
        _route.component = component
        if (loadChildren) {
            const { component: emptyComponent } = bindModule(
                loadChildren,
                component
            )
            _route.children = scannerRoutes(scannerRouterChildren(loadChildren))
            _route.component = emptyComponent
        }

        if (children) {
            _route.children = scannerRoutes(children)
        }
        return _route as RouteRecordRaw
    })
}
