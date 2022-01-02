import { InjectionToken } from 'injection-js'
import { DirectiveClass } from './types'

export const DIRECTIVE = new InjectionToken<DirectiveClass>('DIRECTIVE')
