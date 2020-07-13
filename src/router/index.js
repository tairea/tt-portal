import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login'
import LoginFB from '@/components/LoginFB'
import Dashboard from '@/components/Dashboard'
import TeacherDashboard from '@/components/TeacherDashboard'
import DashboardOverview from '@/components/DashboardOverview'
import ReportsA4 from '@/components/ReportsA4'
import JuniorITLPA4 from '@/components/JuniorITLPA4'
import DashboardA4Ruakura from '@/components/DashboardA4Ruakura'
import Screen from '@/components/Screen'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboardOverview',
      component: DashboardOverview,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'LoginFB',
      component: LoginFB,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/reports',
      name: 'reportsA4',
      component: JuniorITLPA4,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/reportsRuakura',
      name: 'dashboardA4Ruakura',
      component: DashboardA4Ruakura,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/teacher',
      name: 'dashboardOverview',
      component: DashboardOverview,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/screen',
      name: 'screen',
      component: Screen,
      meta: {
          requiresAuth: true
      }
    },
  ],
  mode: "history"
});

const teacherEmails = [
  'i.tairea@taiwananga.co.nz',
  'h.childs@taiwananga.co.nz',
  'c.morgan@taiwananga.co.nz',
  't.waihi@taiwananga.co.nz',
  'c.kauri@taiwananga.co.nz',
  'n.reid@taiwananga.co.nz',
  'a.walker@taiwananga.co.nz',
  'teana.waihi@taiwananga.co.nz',
  't.westrupp@taiwananga.co.nz',

];
const teacherEmailsRuakura = [
  // 'i.tairea@taiwananga.co.nz',
  // 't.westrupp@taiwananga.co.nz',
  // 'tuhoea.watene@taiwananga.co.nz'
];
const sltEmails = [
  'i.tairea@taiwananga.co.nz',
  'h.childs@taiwananga.co.nz',
  't.westrupp@taiwananga.co.nz',
  'tuhoea.watene@taiwananga.co.nz'
];



//Nav Guards
router.beforeEach((to, from, next) => {
  //check for requiredAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //check if NOT logged in
    if (!firebase.auth().currentUser) {
      // Go the login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      const user = firebase.auth().currentUser;
      if (to.path === '/' && teacherEmails.some((x) => x === user.email)) {
        // Go to teacher
        next({
          path: '/dashboard'
        });

      // } else if (to.path === '/' && sltEmails.some((x) => x === user.email)) {
      //   // Go to teacher
      //   next({
      //     path: '/reports'
      //   });

      } else if (to.path === '/' && teacherEmailsRuakura.some((x) => x === user.email)) {
        // Go to teacher
        next({
          path: '/reportsRuakura'
        });

      } else {
        // proceed to the route
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    //check if IS logged in
    if (firebase.auth().currentUser) {
      // Go the login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // proceed to the route
      next()
    }
  } else {
    // proceed to the route
    next()
  }
})

export default router;

