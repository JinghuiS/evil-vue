<script lang="ts">
import {
    Component,
    Viewer,
    VueComponent,
    Inject,
    Computed,
    Link
} from 'packages'
import HelloWorld from './components/HelloWorld.vue'
import { TestService } from './core/service/test.service'
import { watch } from 'vue'

@Component({ components: { HelloWorld } })
export default class AppView extends VueComponent {
    constructor(@Inject(TestService) public testService: TestService) {
        super()
        // testService.test = 2

        watch(
            () => this.a,
            (a) => {
                console.log(a)
                console.log(this.test)
            }
        )
    }
    @Viewer()
    a = 1

    @Link()
    test?: HTMLDivElement
}
</script>

<template>
    <img alt="Vue logo" src="@/assets/logo.png" />
    <div ref="test" v-test @click="a++">{{ a }}</div>
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />

    <router-view />
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
