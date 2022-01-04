import { VueModule } from 'packages'
import App from './App.vue'
import { MyDirectiveModule } from './core/directive/directive.module'
import { TestService } from './core/service/test.service'
import { RoutingModule } from './routing.module'
@VueModule({
    providers: [TestService],
    imports: [MyDirectiveModule, RoutingModule],
    bootstrap: App
})
export class AppModule {}
