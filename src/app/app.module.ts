import { VueModule } from 'packages'
import App from './App.vue'
import { MyDirectiveModule } from './core/directive/directive.module'
@VueModule({
    imports: [MyDirectiveModule],
    bootstrap: App
})
export class AppModule {}
