import { DIRECTIVE, DirectiveModule, VueModule } from 'packages'
import { TestDirective } from './test.directive'

@VueModule({
    providers: [
        {
            provide: DIRECTIVE,
            useClass: TestDirective
        }
    ],
    imports: [DirectiveModule.forRoot()]
})
export class MyDirectiveModule {}
