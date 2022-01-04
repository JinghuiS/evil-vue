<template>
    <div>this is children</div>
</template>

<script lang="ts">
import { Component, VueComponent } from 'packages/class-component'

@Component({ name: 'test' })
export default class TestView extends VueComponent {}
</script>
