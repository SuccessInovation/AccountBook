import { createRouter, createWebHistory } from 'vue-router'

// 페이지 import
import StartPage from '@/pages/StartPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import HomePage from '@/pages/HomePage.vue'
import TransactionPage from '@/pages/TransactionPage.vue'
import PopupPage from '@/pages/PopupPage.vue'
import StatisticsPage from '@/pages/StatisticsPage.vue'
import BudgetPage from '@/pages/BudgetPage.vue'
import ExportExcelPage from '@/pages/ExportExcelPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage, // 홈 경로는 HomePage.vue로
  },
  {
    path: '/start',
    name: 'Start',
    component: StartPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: TransactionPage,
  },
  {
    path: '/popup',
    name: 'Popup',
    component: PopupPage,
  },
  {
    path: '/statistics/summary',
    name: 'Statistics',
    component: StatisticsPage,
  },
  {
    path: '/statistics/export',
    name: 'Exports',
    component: ExportExcelPage,
  },
  {
    path: '/budget',
    name: 'Budget',
    component: BudgetPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
