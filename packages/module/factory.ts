import '@abraham/reflection'

import { ReflectiveInjector } from 'injection-js'
import { isPromise } from '../utils/is'
import { App, createApp } from 'vue'
import { bootstrapModule } from './bootstrap_module'
import {
    InjectorKey,
    VUE_APP,
    APP_INITIALIZER,
    VUE_APP_INIT_STARTUP
} from './module_token'
import { VueModuleScanner } from './scanner'

export class VueFactoryStatic {
    async create(module: any) {
        const scanner = new VueModuleScanner()
        const app = createApp(scanner.scanBootstrap(module))
        const RootInjector = ReflectiveInjector.resolveAndCreate([
            {
                useValue: app,
                provide: VUE_APP
            }
        ])

        const injector = bootstrapModule(module, RootInjector)
        const startup = injector.get(VUE_APP_INIT_STARTUP, null)
        if (isPromise(startup)) {
            await startup
        }
        const initvue = injector.get(APP_INITIALIZER, null)
        if (initvue) {
            initvue(app)
        }
        app.provide(InjectorKey, injector)
        return app
    }
}

export const VueFactory = async (module: any, useVue: (vue: App) => void) => {
    const vue = await new VueFactoryStatic().create(module)
    useVue && useVue(vue)
}
