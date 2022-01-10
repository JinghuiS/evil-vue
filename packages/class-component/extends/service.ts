import { ViewerHandler } from '../decorators/viewer'
import { ComputedHandler } from '../decorators/computed'

import { DecoratorHanlder } from '../types'
import { LinkHandler } from '../decorators/link'

export const ProviderKey = 'ProviderKey' as const

export abstract class VueService {
    static handler: DecoratorHanlder[] = [ViewerHandler, ComputedHandler]
    public constructor() {
        VueService.handler.forEach((handler) => handler.handler(this))
    }
}
