import { VueModule } from 'packages'
import App from './App.vue'
import { MyDirectiveModule } from './core/directive/directive.module'
import { RoutingModule } from './routing.module'
@VueModule({
    imports: [MyDirectiveModule, RoutingModule],
    bootstrap: App
})
export class AppModule {}
