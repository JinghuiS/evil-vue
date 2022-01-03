import { InjectionToken, ReflectiveInjector } from 'injection-js'
import { App, InjectionKey } from 'vue'

/**vue app token */
export const VUE_APP = new InjectionToken<App>('APP_USE')

export const vue_app = {} as App
export type VUE_APP_TYPE = Readonly<typeof vue_app>

/**vue initializer token */
export const APP_INITIALIZER = new InjectionToken<any>('APP_INITIALIZER')

export const VUE_APP_INIT_STARTUP = new InjectionToken('VUE_APP_INITSTARTUP')
/**module InjectorKey */
export const InjectorKey: InjectionKey<ReflectiveInjector> = Symbol(
    'vue-module-injector'
)

export const ModuleProvidersMetadataKey = Symbol('__ModuleProvidersMetadataKey')
export const ModuleImportsMetadataKey = Symbol('__ModuleImportsMetadataKey')

export const ModuleDeclarationsMetadataKey = Symbol(
    '__ModuleDeclarationsMetadataKey'
)

export const ModuleBootstrapMetadataKey = Symbol('__ModuleBootstrapMetadataKey')
