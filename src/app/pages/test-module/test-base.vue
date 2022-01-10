<template>
    <div>
        2121
        <router-view />
    </div>
</template>

<script lang="ts">
import { TestService } from '@/app/core/service/test.service'
import { HttpClient, Inject } from 'packages'
import { Component, VueComponent } from 'packages/class-component'

@Component()
export default class TestBaseView extends VueComponent {
    constructor(@Inject(TestService) public testService: TestService) {
        super()
    }
}
</script>
