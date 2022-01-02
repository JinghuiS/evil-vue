import { Injectable } from 'injection-js'
import type { VueModuleType } from './types'
import { SetModule } from './set_module'

/**
  *VueModule 
  @providers 
  @imports
  @bootstrap
*/
export function VueModule(config: VueModuleType): ClassDecorator {
  return function (target) {
    SetModule.setModuleProviders(config.providers || [], target)
    SetModule.setModuleImports(config.imports || [], target)
    // SetModule.setModuleDeclarations(config.declarations || [], target)
    SetModule.setModuleBootstrap(config.bootstrap, target)
    return Injectable()(target)
  }
}
