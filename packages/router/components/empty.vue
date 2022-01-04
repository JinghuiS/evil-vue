<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Component, VueComponent } from 'packages/class-component'

@Component({
  name: 'vue-evil-router-empty'
})
export default class RouterEmpty extends VueComponent {}
</script>
