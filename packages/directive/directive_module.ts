import { ModuleWithProviders } from '..'
import { StartupDirective } from './create_directive'

export class DirectiveModule {
    static forRoot(): ModuleWithProviders {
        return {
            providers: [],
            vueModule: StartupDirective
        }
    }
}
