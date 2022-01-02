import { Provider } from 'injection-js'
import { Component, ComputedOptions, MethodOptions } from 'vue'

export interface ModuleWithProviders {
  providers: Provider[]
  vueModule: Provider
}

export interface VueModuleType {
  providers?: Provider[]
  imports?: ModuleWithProviders[] | any[]
  bootstrap?: Component<any, any, any, ComputedOptions, MethodOptions> | any
}
