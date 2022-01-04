import { InjectionToken } from 'injection-js'
import { RouterOptions } from 'vue-router'

export const ROUTER_CONFIG = new InjectionToken<RouterOptions>('router-config')
export const ROUTER_GUARD = new InjectionToken('router-guard ')
