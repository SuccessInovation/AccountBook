import { createRouter, createWebHistory } from 'vue-router'

// 페이지 import
import StartPage from '@/pages/StartPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import HomePage from '@/pages/HomePage.vue'
import TransactionPage from '@/pages/TransactionPage.vue'
import PopupPage from '@/pages/PopupPage.vue'
import PopupListPage from '@/pages/PopupListPage.vue'
import StatisticsPage from '@/pages/StatisticsPage.vue'
import BudgetPage from '@/pages/BudgetPage.vue'
import ExportExcelPage from '@/pages/ExportExcelPage.vue'

const routes = [
  {
    path: '/',
    name: 'Start',
    component: StartPage,
    meta: { layout: 'no-layout' }, // 헤더/사이드바 없는 레이아웃
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    // meta: { layout: 'no-layout' }, //  헤더/사이드바 있는 레이아웃
    meta: { layout: 'none' }, //  뷰포트 전체를 차지
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { layout: 'no-layout' }, //  헤더/사이드바 있는 레이아웃
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { layout: 'default' }, //  헤더/사이드바 있는 레이아웃
  },

  {
    path: '/transaction',
    name: 'Transaction',
    component: TransactionPage,
    meta: { layout: 'default' }, //  헤더/사이드바 있는 레이아웃
  },
  {
    path: '/popup',
    name: 'Popup',
    component: PopupPage,
    meta: { layout: 'default' }, //  헤더/사이드바 있는 레이아웃
  },
  {
    path: '/popup/list',
    name: 'PopupList',
    component: PopupListPage,
    meta: { layout: 'default' }, //  헤더/사이드바 있는 레이아웃
  },
  {
    path: '/statistics/summary',
    name: 'Statistics',
    component: StatisticsPage,
    meta: { layout: 'default' }, //  헤더/사이드바 있는 레이아웃
  },
  {
    path: '/statistics/export',
    name: 'Exports',
    component: ExportExcelPage,
    meta: { layout: 'default' }, //  헤더/사이드바 있는 레이아웃
  },
  {
    path: '/budget',
    name: 'Budget',
    component: BudgetPage,
    meta: { layout: 'default' }, //  헤더/사이드바 있는 레이아웃
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
