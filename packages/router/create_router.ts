import { VUE_APP } from '../module'
import type { VUE_APP_TYPE } from '../module'
import { forwardRef, Inject, Injectable, Optional } from 'injection-js'
import { createRouter } from 'vue-router'
import type { RouterConfig } from './types'
import { ROUTER_CONFIG } from './router_token'
import { scannerRoutes } from './load_children'
import { CreateRouterGuard } from './router_guard'

@Injectable()
export class EvilVueRouter {
    constructor(
        private CreateRouterGuard: CreateRouterGuard,
        @Inject(forwardRef(() => VUE_APP))
        private vue: VUE_APP_TYPE,
        @Inject(ROUTER_CONFIG)
        private routerConfig?: RouterConfig
    ) {
        this.created()
    }
    created() {
        if (this.routerConfig) {
            const routes = {
                ...this.routerConfig,
                routes: scannerRoutes(this.routerConfig.routes)
            }
            const appRouter = createRouter(routes)
            this.CreateRouterGuard.register(appRouter)
            this.vue.use(appRouter)
        }
    }
}
