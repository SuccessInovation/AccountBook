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
        (a, b) => new Date(b.date) - new Date(a.date),
      )
    },
    getSortedFiteredRecords: state => {
      return [...state.filteredRecords].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
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
  },
})
