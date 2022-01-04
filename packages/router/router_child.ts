import type { VueEvilRouterRaw } from './types'
import { RouterChildKey } from './router_config'
function RouterChildDecorator(routes: VueEvilRouterRaw[]): ClassDecorator {
    return function (target: any) {
        Reflect.defineMetadata(RouterChildKey, routes || [], target)
        return target
    }
}

class RouterChildClass {}

export function RouterChild(routes: VueEvilRouterRaw[]) {
    return RouterChildDecorator(routes)(RouterChildClass)
}
