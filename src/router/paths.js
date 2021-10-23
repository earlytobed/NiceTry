/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
import store from '../store'

export default [
  {
    path: '*',
    meta: {
      name: '',
      requiresAuth: true
    },
    redirect: {
      path: '/torrents'
    }
  },
  // This  allows you to have pages apart of the app but no rendered inside the dash
  {
    path: '/',
    meta: {
      name: 'Login Home',
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "routes" */ `@/views/LoginHome.vue`),
    // redirect if already signed in
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authorized']) {
        next('/torrents')
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        component: () => import(`@/components/LoginForm.vue`)
      },
      {
        path: '/register',
        component: () => import(`@/components/RegisterForm.vue`)
      }
    ]
  },
  {
    path: '/torrents',
    meta: {
      name: 'Torrents View',
      requiresAuth: true
    },
    component: () => import(`@/views/TorrentsView.vue`),
    children: [
      {
        path: '/preference',
        component: () => import(`@/components/PreferencePage.vue`)
      },
      {
        path: '/submit',
        component: () => import(`@/components/TorrentSubmitForm.vue`)
      }
    ]
  }
]
