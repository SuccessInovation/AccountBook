// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 컴포넌트 임포트 (TransactionEdit.vue는 components 폴더에 있어도 문제 없습니다)
import TransactionPage from '@/pages/TransactionPage.vue'
import TransactionEdit from '@/components/TransactionEdit.vue'
import HomePage from '@/pages/HomePage.vue'
import StartPage from '@/pages/StartPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import PopupPage from '@/pages/PopupPage.vue'
import StatisticsPage from '@/pages/StatisticsPage.vue'
import BudgetPage from '@/pages/BudgetPage.vue'
import ExportExcelPage from '@/pages/ExportExcelPage.vue'

const routes = [
  {
    path: '/transaction/edit/:id',   // 동적 파라미터 :id
    name: 'TransactionEdit',
    component: TransactionEdit,
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: TransactionPage,
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage,
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
