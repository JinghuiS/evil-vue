import { TestService } from '@/app/core/service/test.service'
import { VueModule } from 'packages/module'
import { VueEvilRouterModule } from 'packages/router'
import TestBase from './test-base.vue'
@VueModule({
    imports: [
        VueEvilRouterModule.forChild({
            routes: [
                {
                    path: '/test',
                    component: () => import('./test')
                }
            ]
        })
    ],
    providers: [TestService],
    bootstrap: TestBase
})
export class TestViewModule {}
