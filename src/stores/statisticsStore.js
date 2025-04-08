import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3000/records'

export const statisticsStore = defineStore('statistics', {
  state: () => ({
    records: [],
    filteredRecords: [],
    loading: false,
    error: null,
  }),

  getters: {
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
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    //#region 기간으로 조회 기능
    /**
     * 1개월, 3개월, 설정기간 별로 데이터 불러오기
     * 변수 설명
     *return 값 설명
     */
    async fetchRecordsByPeriod(startDate = null, endDate = new Date()) {
      this.loading = true
      this.error = null

      try {
        const today = new Date()
        const defaultStart = new Date()
        defaultStart.setMonth(today.getMonth() - 1)

        // 실제 시작/끝 날짜 설정
        const start = startDate ? new Date(startDate) : defaultStart
        const end = endDate ? new Date(endDate) : today

        const res = await axios.get(API_URL)
        this.records = res.data

        const filtered = this.records.filter(record => {
          const recordDate = new Date(record.date)
          return recordDate >= start && recordDate <= end
        })

        return (this.filteredRecords = filtered)
      } catch (err) {
        this.error = err.message
        return []
      } finally {
        this.loading = false
      }
    },

    // endregion
  },
})
