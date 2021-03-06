import { forwardRef, Inject, Injectable, Optional } from 'injection-js'

import { VUE_APP } from 'packages'
import type { VUE_APP_TYPE } from 'packages'
import { isArray } from 'packages/utils/is'
import { DirectiveImplements } from './types'
import { DIRECTIVE } from './directive_token'

@Injectable()
export class StartupDirective {
    constructor(
        @Inject(forwardRef(() => VUE_APP))
        private vue: VUE_APP_TYPE,
        @Optional()
        @Inject(DIRECTIVE)
        directive?: DirectiveImplements[] | DirectiveImplements
    ) {
        if (directive) {
            if (isArray(directive)) {
                directive.map((item) => {
                    vue.directive(item.name, item)
                })
            } else {
                directive && vue.directive(directive.name, directive)
            }
        }
    }
}
