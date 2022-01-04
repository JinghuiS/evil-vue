import { Component, VueComponent } from 'packages/class-component'
import { RouterView } from 'vue-router'

export class RouterEmptyComponent extends VueComponent {
  render() {
    return <RouterView />
  }
}
export function RouterEmpty(module: any) {
  return Component({})
}
