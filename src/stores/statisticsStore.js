import { defineStore } from 'pinia'
import axios from 'axios'
import {
  calculateCategoryTotals,
  calculateMonthlyTotals,
  calculateNetProfit,
} from '@/utils/statistics'

<<<<<<< HEAD
const API_URL = 'http://localhost:3000/records'

export const statisticsStore = defineStore('statistics', {
  state: () => ({
    records: [],
    filteredRecords: [],
    loading: false,
    error: null,
=======
import { use_calendar_store } from '@/stores/MonthSelector'
// BASE_URI (db.json)
import { BASE_URI } from '@/constants/api'

export const statisticsStore = defineStore('statistics', {
  state: () => ({
    transactions: [],
    filteredTransaction: [],
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677

    // 통계용
    monthlyCategoryData: {},
    monthlyExpenseData: {},
    monthlyIncomeData: {},
    netProfitData: {},
  }),

  getters: {
<<<<<<< HEAD
    getSortedRecords: state => {
      return [...state.records].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      )
    },
  },

  actions: {
    async fetchRecords() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(API_URL)
        this.records = res.data

        this.calculateStatistics() // 불러온 데이터로 통계 계산 시작
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

=======
    getNetProfit: state => state.netProfitData.netProfit ?? 0,
    getIncome: state => state.netProfitData.income ?? 0,
    getExpense: state => state.netProfitData.expense ?? 0,
  },
  actions: {
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
    //#region 기간으로 조회 기능
    /**
     * 1개월, 3개월, 설정기간 별로 데이터 불러오기
     * @params StartDate, endDate = 시작 날짜, 끝 날짜 받아오는 값
     *
     *return : 기간별로 필터링된 결과 -> 컴포넌트로 전송
     */
<<<<<<< HEAD
    async fetchRecordsByPeriod(startDate = null, endDate = new Date()) {
      this.loading = true
      this.error = null

      try {
        const res = await axios.get(API_URL)
        this.records = res.data
=======
    async fetchTransactionsByPeriod(startDate, endDate) {
      try {
        const res = await axios.get(`${BASE_URI}/transactions`)
        // data 내림차순 정렬
        this.transactions = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        )
        // 불러온 데이터로 통계 계산 시작
        // this.calculateStatistics()
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677

        const today = new Date() // 오늘 날짜
        const defaultStart = new Date()
        defaultStart.setMonth(today.getMonth() - 1) // 기본 설정값 : 1개월

        // 실제 시작/끝 날짜 설정 (입력이 없으면 default값)
        const start = startDate ? new Date(startDate) : defaultStart
        const end = endDate ? new Date(endDate) : today

        // db에서 date(날짜)로 불러와서 특정 기간에만 필터링
<<<<<<< HEAD
        const filtered = this.records.filter(record => {
          const recordDate = new Date(record.date)
          return recordDate >= start && recordDate <= end
        })

        return (this.filteredRecords = filtered)
=======
        const filtered = this.transactions.filter(tr => {
          const transactionDate = new Date(tr.date)
          return transactionDate >= start && transactionDate <= end
        })

        this.filteredTransaction = filtered

        // ✅ 필터링 저장 후 통계 계산 (순서 중요)
        this.calculateStatistics()

        return filtered
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
      } catch (err) {
        this.error = err.message
        return []
      } finally {
        this.loading = false
      }
    },

    // 통계 계산
    calculateStatistics() {
<<<<<<< HEAD
      console.log('filteredRecords:', this.filteredRecords)
      this.monthlyCategoryData = calculateCategoryTotals(this.filteredRecords)
      this.monthlyExpenseData = calculateMonthlyTotals(this.records, '지출')
      this.monthlyIncomeData = calculateMonthlyTotals(this.records, '수입')
      this.netProfitData = calculateNetProfit(this.filteredRecords)
      console.log('netProfitData:', this.netProfitData)
    },

=======
      const calendar = use_calendar_store()
      this.monthlyCategoryData = calculateCategoryTotals(
        this.filteredTransaction,
      )
      this.monthlyExpenseData = calculateMonthlyTotals(
        this.transactions,
        'expense',
        calendar.current_year,
        calendar.current_month,
      )
      this.monthlyIncomeData = calculateMonthlyTotals(
        this.transactions,
        'income',
        calendar.current_year,
        calendar.current_month,
      )
      this.netProfitData = calculateNetProfit(this.filteredTransaction)
    },
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
    // endregion
  },
})
