import { VueModule } from 'packages/module'
import { VueEvilRouterModule } from 'packages'
import { createWebHashHistory } from 'vue-router'
import { TestViewModule } from './pages/test-module/test.module'

@VueModule({
    imports: [
        VueEvilRouterModule.forRoot({
            history: createWebHashHistory(),
            routes: [
                {
                    path: '/',
                    loadChildren: TestViewModule
                }
            ]
        })
    ]
})
export class RoutingModule {}
