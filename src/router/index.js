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
import TransactionEdit from '@/pages/TransactionEdit.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomePage, // 홈 경로는 HomePage.vue로
    meta: { title: 'HOME', layout: 'default' },
  },
  {
    path: '/',
    name: 'Start',
    component: StartPage,
    meta: {
      title: '시작',
      layout: 'none',
      backgroundColor: '#b7ccb4',
      centerContent: true,
    },
  },
  {
    path: '/transaction/edit/:id',
    name: 'TransactionEdit',
    component: () => import('@/pages/TransactionEdit.vue'), // 혹은 적절한 컴포넌트 경로
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      title: '로그인',
      layout: 'none',
      backgroundColor: '#b7ccb4',
      centerContent: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { title: '회원가입', layout: 'none' },
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
    meta: { title: '수입/지출 내역', layout: 'default' },
  },
  {
    path: '/popup',
    name: 'Popup',
    component: PopupPage,
    meta: { layout: 'default' },
  },
  {
    path: '/statistics/summary',
    name: 'Statistics',
    component: StatisticsPage,
    meta: { title: '통계 - 요약 통계', layout: 'default' },
  },
  {
    path: '/statistics/export',
    name: 'Exports',
    component: ExportExcelPage,
    meta: { title: '통계 - 엑셀 내보내기', layout: 'default' },
  },
  {
    path: '/budget',
    name: 'Budget',
    component: BudgetPage,
    meta: { title: '예산', layout: 'default' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
