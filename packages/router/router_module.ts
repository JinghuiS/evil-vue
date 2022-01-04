import { ModuleWithProviders } from 'packages'
import { VueRouter } from './create_router'
import { RouterChild } from './router_child'
import type {
    VueEvilRouterChildOptions,
    VueEvilRouterOptions,
    VueEvilRouterRaw
} from './types'
import { CreateRouterGuard, EmptyRouterGuard } from './router_guard'
import { RouterService, RouteService } from './router_service'
import { ROUTER_CONFIG, ROUTER_GUARD } from './router_token'

export class VueEvilRouterModule {
    static forRoot(config: VueEvilRouterOptions): ModuleWithProviders {
        return {
            providers: [
                {
                    useClass: EmptyRouterGuard,
                    provide: ROUTER_GUARD
                },
                CreateRouterGuard,
                { provide: ROUTER_CONFIG, useValue: config },
                RouterService,
                RouteService
            ],
            vueModule: VueRouter
        }
    }
    static forChild({ routes }: VueEvilRouterChildOptions) {
        return RouterChild(routes)
    }
}
