import { Component, ComputedOptions, MethodOptions } from 'vue'
import { InjectionToken } from 'injection-js'
import { VueEvilRouterOptions } from './types'

export const RouterChildKey = Symbol('RouterChild')

export const RouterDefaultConfig = {} as VueEvilRouterOptions
