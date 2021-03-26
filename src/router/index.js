import Vue from 'vue'
import Router from 'vue-router'
import world from '@/components/world'
import worldModels from '@/components/worldModels'
import frameworkClass from '@/components/framework'
import worldBFS from '@/components/worldBFS'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'world',
      component: world,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/worldModels',
      name: 'worldModels',
      component: worldModels,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/frameworkClass',
      name: 'frameworkClass',
      component: frameworkClass,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/worldBFS',
      name: 'worldBFS',
      component: worldBFS,
      meta: {
        requiresVisitor: true
      }
    }
  ]
})
