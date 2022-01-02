import { VueFactory } from 'packages'
import { AppModule } from './app/app.module'

VueFactory(AppModule, (vue) => {
  vue.mount('#app')
})
