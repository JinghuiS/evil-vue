import { DirectiveBinding, VNode } from 'vue'
import { Injectable } from 'injection-js'
import { DirectiveImplements } from 'packages'

@Injectable()
export class TestDirective implements DirectiveImplements {
    /** 指令名称*/
    name: string = 'test'

    mounted(
        el: any,
        binding: DirectiveBinding<any>,
        vnode: VNode<any, any, { [p: string]: any }>,
        prevVnode: any
    ): any {
        console.log('v-test mounted', el)
    }
}
