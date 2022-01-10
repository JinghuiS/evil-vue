import { HttpClientModule, VueModule } from 'packages'
import App from './App.vue'
import { MyDirectiveModule } from './core/directive/directive.module'
import { TestService } from './core/service/test.service'
import { RoutingModule } from './routing.module'
@VueModule({
    providers: [TestService],
    imports: [MyDirectiveModule, RoutingModule, HttpClientModule.forRoot()],
    bootstrap: App
})
export class AppModule {}
