import { TestService } from '@/app/core/service/test.service'
import { Component, VueComponent } from 'packages/class-component'

@Component({ name: 'test' })
export default class TestView extends VueComponent {
    constructor(public testService: TestService) {
        super()
    }
    render() {
        return <div>this is children {this.testService.test} </div>
    }
}
