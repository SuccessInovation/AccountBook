import { defineStore } from 'pinia'
import axios from 'axios'
// import {
//   calculateCategoryTotals,
//   calculateMonthlyTotals,
//   calculateNetProfit,
// } from '@/utils/statistics'

// BASE_URI (db.json)
import { BASE_URI } from '@/constants/api'

export const statisticsStore = defineStore('statistics', {
  state: () => ({
    transactions: [],
    filteredTransaction: [],

    // 통계용
    monthlyCategoryData: {},
    monthlyExpenseData: {},
    monthlyIncomeData: {},
    netProfitData: {},
  }),

  getters: {
    getNetProfit: state => state.netProfitData.netProfit ?? 0,
    getIncome: state => state.netProfitData.income ?? 0,
    getExpense: state => state.netProfitData.expense ?? 0,
  },
  actions: {
    //#region 기간으로 조회 기능
    /**
     * 1개월, 3개월, 설정기간 별로 데이터 불러오기
     * @params StartDate, endDate = 시작 날짜, 끝 날짜 받아오는 값
     *
     *return : 기간별로 필터링된 결과 -> 컴포넌트로 전송
     */
    async fetchTransactionsByPeriod(startDate, endDate) {
      try {
        // data 내림차순 정렬
        // 전체 거래가 없을 때만 서버에서 불러오기
        if (this.transactions.length === 0) {
          const res = await axios.get(`${BASE_URI}/transactions`)
          this.transactions = res.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date),
          )
        }
        // this.calculateStatistics() // 불러온 데이터로 통계 계산 시작

        const today = new Date() // 오늘 날짜
        const defaultStart = new Date()
        defaultStart.setMonth(today.getMonth() - 1) // 기본 설정값 : 1개월

        // 실제 시작/끝 날짜 설정 (입력이 없으면 default값)
        const start = startDate ? new Date(startDate) : defaultStart
        const end = endDate ? new Date(endDate) : today

        // db에서 date(날짜)로 불러와서 특정 기간에만 필터링
        const filtered = this.transactions.filter(tr => {
          const transactionDate = new Date(tr.date)
          return transactionDate >= start && transactionDate <= end
        })

        return (this.filteredTransaction = filtered)
      } catch (err) {
        this.error = err.message
        return []
      } finally {
        this.loading = false
      }
    },

    // 통계 계산
    // calculateStatistics() {
    //   console.log('filteredRecords:', this.filteredTransaction)
    //   this.monthlyCategoryData = calculateCategoryTotals(
    //     this.filteredTransaction,
    //   )
    //   this.monthlyExpenseData = calculateMonthlyTotals(
    //     this.transactions,
    //     '지출',
    //   )
    //   this.monthlyIncomeData = calculateMonthlyTotals(this.transactions, '수입')
    //   this.netProfitData = calculateNetProfit(this.filteredTransaction)
    //   console.log('netProfitData:', this.netProfitData)
    // },
    // endregion
  },
})
