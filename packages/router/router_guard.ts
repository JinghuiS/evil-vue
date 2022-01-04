import { forwardRef, Inject, Injectable } from 'injection-js'
import { Router } from 'vue-router'

import { isArray } from 'packages/utils/is'
import { RouterGuardImplements } from './types'
import { ROUTER_GUARD } from './router_token'

@Injectable()
export class CreateRouterGuard {
    constructor(
        @Inject(forwardRef(() => ROUTER_GUARD))
        private _guard: RouterGuardImplements[] | RouterGuardImplements
    ) {}

    register(router: Router) {
        if (isArray(this._guard)) {
            this._guard.map((item: RouterGuardImplements) => {
                item.beforeEach && router.beforeEach(item.beforeEach)
                item.afterEach && router.afterEach(item.afterEach)
                item.beforeResolve && router.beforeResolve(item.beforeResolve)
            })
        } else {
            this._guard.beforeEach && router.beforeEach(this._guard.beforeEach)
            this._guard.afterEach && router.afterEach(this._guard.afterEach)
            this._guard.beforeResolve &&
                router.beforeResolve(this._guard.beforeResolve)
        }
    }
}

@Injectable()
export class EmptyRouterGuard implements RouterGuardImplements {}
