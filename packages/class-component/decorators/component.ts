import { InjectorKey } from 'packages'
import { Injectable, Provider, ReflectiveInjector } from 'injection-js'
import { inject, provide } from 'vue'
import { Autobind } from '../utils/autobind'

export interface ComponentProps {
  [ComponentProps: string]:
    | any
    | {
        type: any
        default?: any
      }
}

export interface ComponentOptions {
  /**
   * component name
   */
  name?: string
  /**
   * component injection
   */
  providers?: Provider[]
  /**
   * components
   */
  components?: {
    [ComponentName: string]: any
  }
  /**
   * Attribute inherit
   */
  inheritAttrs?: boolean
}

const ClassMetadataKey = Symbol('Vue-Class-Component')

const ProvidersMetadataKey = Symbol('Vue-Class-Component-Providers')

export function Component(options?: ComponentOptions): ClassDecorator {
  return function (target: any) {
    if (!target.resolveComponent) target.resolveComponent = resolveComponent
    Reflect.defineMetadata(
      ClassMetadataKey,
      {
        name: options?.name,
        components: options?.components || {},
        inheritAttrs: options?.inheritAttrs || true,
        ...options
      },
      target
    )
    Reflect.defineMetadata(
      ProvidersMetadataKey,
      options?.providers || [],
      target
    )

    return Autobind()(Injectable()(target))
  }
}

export function resolveComponent(target: any) {
  const parent = inject(InjectorKey, undefined)
  const providers: any = Reflect.getOwnMetadata(ProvidersMetadataKey, target)

  let deps: Provider[] = providers || []
  if (!deps.includes(target)) deps.unshift(target)

  const resolveProviders = ReflectiveInjector.resolve(deps)
  const injector = ReflectiveInjector.fromResolvedProviders(
    resolveProviders,
    parent
  )
  provide(InjectorKey, injector)
  const compInstance = injector.get(target)
  if (providers?.length)
    resolveProviders.forEach((k) => injector.get(k.key.token))
  return compInstance
}

export function getComponentOptions(target: any): any {
  const componentOptions = Reflect.getOwnMetadata(ClassMetadataKey, target)
  if (!componentOptions) {
    console.group(
      ` %c error component ${target.name} `,
      'color: white; font-size: q4px; background: #f5222d; padding: 3px'
    )
    console.log(`${target.name} component need Component Decorators `)
    console.groupEnd()
  }
  return componentOptions || {}
}
