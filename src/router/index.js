import { createRouter, createWebHistory } from 'vue-router'
import FormView from '../views/FromView.vue'
import { useStore } from '../stores/counter'
import FormCheckVue from '../views/FormCheckView.vue'
import SignInOptionsView from '../views/SignInOptionsView.vue'
import SelfieView from '../views/SelfieView.vue'
import CouponQR from '../components/CouponQR.vue'
import SubmissionConfirmationView from '../views/SubmissionConfirmationView.vue'

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
      component: FormView
    },
    {
      path: '/selfie',
      name: 'selfie',
      component: SelfieView
    },
    {
      path: '/registered',
      name: 'registered',
      component: SubmissionConfirmationView
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: CouponQR
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
