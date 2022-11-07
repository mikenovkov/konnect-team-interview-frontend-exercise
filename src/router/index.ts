import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/PageHome.vue'),
    },
    {
      path: '/service-details/:id',
      name: 'ServiceDetails',
      component: () => import('../views/ServiceDetails.vue'),
      props: true,
    },
  ],
})

export default router
