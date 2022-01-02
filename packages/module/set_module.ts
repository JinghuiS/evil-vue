import { Provider } from 'injection-js'
import {
  ModuleProvidersMetadataKey,
  ModuleImportsMetadataKey,
  ModuleDeclarationsMetadataKey,
  ModuleBootstrapMetadataKey
} from './module_token'

export class SetModule {
  static setModuleProviders(providers: Provider[], target: any) {
    Reflect.defineMetadata(ModuleProvidersMetadataKey, providers || [], target)
  }
  static setModuleImports(imports: any[], target: any) {
    Reflect.defineMetadata(ModuleImportsMetadataKey, imports || [], target)
  }
  static setModuleDeclarations(declarations: any[], target: any) {
    Reflect.defineMetadata(
      ModuleDeclarationsMetadataKey,
      declarations || [],
      target
    )
  }
  static setModuleBootstrap(bootstrap: any, target: any) {
    Reflect.defineMetadata(ModuleBootstrapMetadataKey, bootstrap, target)
  }
}
