<script lang="ts">
import { Component, Viewer, VueComponent } from 'packages'
import HelloWorld from './components/HelloWorld.vue'
import { watch } from 'vue'
@Component({ components: { HelloWorld } })
export default class AppView extends VueComponent {
  constructor() {
    super()
    watch(
      () => this.a,
      (a) => {
        console.log(a)
      }
    )
  }
  @Viewer()
  a = 1
}
</script>

<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <div @click="a++">{{ a }}</div>
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
