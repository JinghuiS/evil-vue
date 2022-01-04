import { VueModule } from 'packages/module'
import { VueEvilRouterModule } from 'packages/router'

@VueModule({
    imports: [
        VueEvilRouterModule.forChild({
            routes: [
                {
                    path: '/test',
                    component: () => import('./test.vue')
                }
            ]
        })
    ]
})
export class TestViewModule {}
