import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useStore } from '../stores/counter'
import FormCheckVue from '../components/FormCheck.vue'
import SignInOptionsView from '../views/SignInOptionsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SignInOptionsView,
    },
    {
      path: '/DoubleCheck',
      name: 'formCheck',
      component: FormCheckVue
    },
    {
      path: '/formview',
      name: 'formView',
      component: HomeView
    },
    {
      path: '/QR',
      name: 'QR',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/QRview.vue')
    }
  ],
  
})

router.beforeEach((to) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useStore()

  if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
})

export default router
