<script setup>
import { storeToRefs } from 'pinia'
import { use_calendar_store } from '@/stores/MonthSelector'
import { useTransactionStore } from '@/stores/TransactionStore'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PopupListPage from '@/pages/PopupListPage.vue'

const calendar = use_calendar_store()
const transactionStore = useTransactionStore()
const { transactions } = storeToRefs(transactionStore)
const { current_year, current_month } = storeToRefs(calendar)
const router = useRouter()

onMounted(() => {
  transactionStore.fetchTransactions()
})

const days = ['일', '월', '화', '수', '목', '금', '토']
const today = new Date()

const showSelectedDateList = ref(false)

const openSelectedDateList = day => {
  if (!day) return
  const selectedDate = `${current_year.value}-${String(current_month.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  router.replace({ query: { date: selectedDate } })
  showSelectedDateList.value = true
}

const closePopup = () => {
  showSelectedDateList.value = false
}

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
const getStartDay = (year, month) => new Date(year, month, 1).getDay()

const weeks = computed(() => {
  const totalDays = getDaysInMonth(current_year.value, current_month.value)
  const startDay = getStartDay(current_year.value, current_month.value)
  const dates = []

  for (let i = 0; i < startDay; i++) dates.push(null)
  for (let i = 1; i <= totalDays; i++) dates.push(i)
  while (dates.length % 7 !== 0) dates.push(null)

  const result = []
  for (let i = 0; i < dates.length; i += 7) {
    result.push(dates.slice(i, i + 7))
  }
  return result
})

const getDailySummary = day => {
  if (!day) return { income: 0, expense: 0 }
  const dateStr = `${current_year.value}-${String(current_month.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  const dailyRecords = transactions.value?.filter(r => r.date === dateStr) || []
  const income = dailyRecords
    .filter(r => r.type === 'income')
    .reduce((sum, r) => sum + r.amount, 0)
  const expense = dailyRecords
    .filter(r => r.type === 'expense')
    .reduce((sum, r) => sum + r.amount, 0)
  return { income, expense }
}

const isToday = day => {
  return (
    today.getDate() === day &&
    today.getMonth() === current_month.value &&
    today.getFullYear() === current_year.value
  )
}
</script>
<template>
  <div class="calendar-wrapper">
    <table class="calendar-table">
      <thead>
        <tr>
          <th v-for="day in days" :key="day" class="day-header">
            {{ day }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, wIdx) in weeks" :key="wIdx">
          <td
            v-for="(date, dIdx) in week"
            :key="dIdx"
            @click="openSelectedDateList(date)"
            class="calendar-cell"
            :class="{ today_highlight: isToday(date) }"
          >
            <div v-if="date">
              <strong>{{ date }}</strong>
              <div v-if="getDailySummary(date).income" class="text-income">
                +{{ getDailySummary(date).income.toLocaleString() }}
              </div>
              <div v-if="getDailySummary(date).expense" class="text-expense">
                -{{ getDailySummary(date).expense.toLocaleString() }}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <PopupListPage v-if="showSelectedDateList" @close="closePopup" />
  </div>
</template>

<style scoped>
.calendar-wrapper {
  max-width: 860px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

.calendar-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

.day-header {
  color: #267c49;
  font-weight: bold;
  padding: 0.75rem;
  font-size: 1rem;
}

.calendar-cell {
  height: 100px;
  padding: 0.5rem;
  vertical-align: top;
  text-align: left;
  background-color: white;
  cursor: pointer;
}

.calendar-cell > div {
  padding-left: 0.2rem;
}

.text-income {
  color: #267caa;
  font-size: 0.85rem;
}

.text-expense {
  color: #d9534f;
  font-size: 0.85rem;
}

.today_highlight {
  background-color: rgba(153, 188, 133, 0.5);
  border-radius: 12px;
}
</style>
