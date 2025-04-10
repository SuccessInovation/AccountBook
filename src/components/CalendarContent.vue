<!-- src/components/CalendarContent.vue -->
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
onMounted(() => {
  transactionStore.fetchTransactions()
})

const { current_year, current_month, visible_months } = storeToRefs(calendar)
const month_names = calendar.month_names

const router = useRouter()
const today = new Date()
// const { current_year, current_month } = storeToRefs(calendar)

const days = ['일', '월', '화', '수', '목', '금', '토']
//달력 showCalendar, openCalendar
const showSelectedDateList = ref(false)

// 날짜 넘겨서 거래 내역 팝업으로 이동
const openSelectedDateList = day => {
  if (!day) return
  const selectedDate = `${current_year.value}-${String(current_month.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  router.replace({ query: { date: selectedDate } })
  showSelectedDateList.value = true
}

function closePopup() {
  showSelectedDateList.value = false
}

const amount = ref(0)

// const records = ref([])

// // db.json 데이터 로딩
// onMounted(async () => {
//   const res = await fetch('/db.json')
//   const data = await res.json()
//   records.value = data.records
// })
// // 테스트
// console.log(records)

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
const getStartDay = (year, month) => new Date(year, month, 1).getDay()

// 주,일 자동 계산(computed 로직)
const weeks = computed(() => {
  const totalDays = getDaysInMonth(current_year.value, current_month.value)
  const startDay = getStartDay(current_year.value, current_month.value)
  const dates = []

  for (let i = 0; i < startDay; i++) {
    dates.push(null)
  }
  for (let i = 1; i <= totalDays; i++) {
    dates.push(i)
  }
  while (dates.length % 7 !== 0) {
    dates.push(null)
  }
  const weeks = []
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7))
  }
  return weeks
})

// 데이터 필터(날짜, 거래 타입, 거래 비용 합산)
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

// 오늘 날짜 배경색 변경
const isToday = day => {
  return (
    today.getDate() === day &&
    today.getMonth() === current_month.value &&
    today.getFullYear() === current_year.value
  )
}
</script>

<template>
  <!-- 월 이동 컴포넌트 -->
  <!-- <div class="calendar_carousel">
    <button type="button" class="arrow" @click="calendar.go_to_prev_month">
      &lt;
    </button>

    <div class="month_slider">
      <div
        v-for="(month, index) in visible_months"
        :key="index"
        class="month_item"
      >
        <p :class="{ active: index === 1, faded: index !== 1 }">
          {{ month.year }} {{ month_names[month.month] }}
        </p>
      </div>
    </div>

    <button type="button" class="arrow" @click="calendar.go_to_next_month">
      &gt;
    </button>
  </div> -->
  <!-- 달력 출력 -->
  <div class="container">
    <table class="table table-bordered text-center">
      <thead class="table-light">
        <tr>
          <th v-for="day in days" :key="day" :class="{ 'text-success': true }">
            {{ day }}
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- 주 -->
        <tr v-for="(week, wIdx) in weeks" :key="wIdx">
          <!-- 일 -->
          <td
            v-for="(date, dIdx) in week"
            :key="dIdx"
            @click="openSelectedDateList(date)"
            class="position"
            :class="{ today_highlight: isToday(date) }"
            style="height: 100px; cursor: pointer"
          >
            <!-- 거래내역 합산 -->
            <div v-if="date">
              <strong>{{ date }}</strong>
              <div
                v-if="getDailySummary(date).income"
                class="text-primary small"
              >
                +{{ getDailySummary(date).income.toLocaleString() }}
              </div>
              <div
                v-if="getDailySummary(date).expense"
                class="text-danger small"
              >
                -{{ getDailySummary(date).expense.toLocaleString() }}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 추가버튼 클릭시 리스트 팝업 -->
    <!-- <PopupPageCopy v-if="showSelectedDateList" @close="closePopup" /> -->
    <!-- 팝업취소 -->
    <PopupListPage v-if="showSelectedDateList" @close="closePopup" />
  </div>
</template>

<style scoped>
/* 월 이동 컴포넌트 */
/* 달력 컴포넌트 */
.container {
  align-items: center;
  margin: 1rem;
  max-height: 30rem;
}
.table {
  width: 50rem;
  border-radius: 30px;
  align-items: center;
}
.tabld thead,
th,
td,
tr {
  background: none;
  border: none;
}
.table td {
  vertical-align: top;
  padding: 0.5rem;
  width: 12rem;
}
.text-success {
  color: var(--point-1-color);
}
.today_highlight {
  background-color: rgba(153, 188, 133, 0.7); /* 투명도 지정해야해서 rgba로*/
  color: white;
}
</style>
