import { Provider } from 'injection-js'
import {
    ModuleBootstrapMetadataKey,
    ModuleDeclarationsMetadataKey,
    ModuleImportsMetadataKey,
    ModuleProvidersMetadataKey
} from './module_token'
import { ModuleWithProviders } from './types'

export class VueModuleScanner {
    constructor() {}

    public providers: Provider[] = []
    public declarations: any[] = []
    public startupModules: Provider[] = []
    scanModule(module: any) {
        this.scanImports(module)
        this.scanProviders(module)
        return {
            providers: this.providers,
            declarations: this.declarations,
            startupModules: this.startupModules
        }
    }

    scanBootstrap(module: any): any {
        return Reflect.getOwnMetadata(ModuleBootstrapMetadataKey, module)
    }

    scanProviders(module: any) {
        const providers: Provider[] =
            Reflect.getOwnMetadata(ModuleProvidersMetadataKey, module) || []
        this.providers = [...this.providers, ...providers]
    }

    scanImports(module: any) {
        const imports: ModuleWithProviders[] | any[] =
            Reflect.getOwnMetadata(ModuleImportsMetadataKey, module) || []
        const moduleProviders: Provider[] = []
        imports.map((item) => {
            if (item.vueModule) {
                this.startupModules.push(item.vueModule)
            }
            if (item.providers) {
                this.providers = [...this.providers, ...item.providers]
            }
            if (!item.vueModule && !item.providers) {
                const itemModule = this.scanModule(item)
                moduleProviders.concat(itemModule.providers)
            }
        })

        this.providers = this.providers.concat(moduleProviders)
    }

    scanDeclarations(module: any) {
        const declarations: any[] =
            Reflect.getOwnMetadata(ModuleDeclarationsMetadataKey, module) || []
        this.declarations = declarations
    }
}
