import { InjectionToken } from 'injection-js'
import { DirectiveImplements } from './types'

export const DIRECTIVE = new InjectionToken<DirectiveImplements>('DIRECTIVE')
