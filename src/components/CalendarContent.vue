<script setup>
import { ref, computed, onMounted } from 'vue'

const today = new Date()
const year = ref(today.getFullYear())
const month = ref(today.getMonth())

const days = ['일', '월', '화', '수', '목', '금', '토']
const selectedDate = ref(null)
const amount = ref(0)

const records = ref([])

// db.json 데이터 로딩
onMounted(async () => {
  const res = await fetch('/db.json')
  const data = await res.json()
  records.value = data.records
})
// 테스트
console.log(records)

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
const getStartDay = (year, month) => new Date(year, month, 1).getDay()

// 주 자동 계산(computed 로직)
const weeks = computed(() => {
  const totalDays = getDaysInMonth(year.value, month.value)
  const startDay = getStartDay(year.value, month.value)
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

// prevMonth, nextMonth -> 월이동 컴포넌트 생기면 삭제?살려서?
const prevMonth = () => {
  if (month.value === 0) {
    month.value = 11
    year.value--
  } else {
    month.value--
  }
  selectedDate.value = null
}

const nextMonth = () => {
  if (month.value === 11) {
    month.value = 0
    year.value++
  } else {
    month.value++
  }
  selectedDate.value = null
}

const selectDate = date => {
  if (date) {
    selectedDate.value = date
    amount.value = 0
  }
}

// 데이터 필터(날짜, 거래 타입, 거래 비용 합산)
const getDailySummary = day => {
  // 날짜 없는 빈칸 -> 계산안하고 0으로
  if (!day) return { income: 0, expense: 0 }

  const dateStr = `${year.value}-${String(month.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  const dailyRecords = records.value.filter(r => r.date === dateStr)
  const income = dailyRecords
    .filter(r => r.type === '수입')
    .reduce((sum, r) => sum + r.amount, 0)
  const expense = dailyRecords
    .filter(r => r.type === '지출')
    .reduce((sum, r) => sum + r.amount, 0)
  return { income, expense }
}

// 오늘 날짜 배경색 변경
const isToday = day => {
  return (
    today.getDate() === day &&
    today.getMonth() === month.value &&
    today.getFullYear() === year.value
  )
}

// const totalSummary = computed(() => {
//   const thisMonthStr = `${year.value}-${String(month.value + 1).padStart(2, '0')}`
//   const thisMonthRecords = records.value.filter((r) => r.date.startsWith(thisMonthStr))
//   const income = thisMonthRecords
//     .filter((r) => r.type === '수입')
//     .reduce((sum, r) => sum + r.amount, 0)
//   const expense = thisMonthRecords
//     .filter((r) => r.type === '지출')
//     .reduce((sum, r) => sum + r.amount, 0)
//   return { income, expense }
// })
</script>

<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center my-3">
      <button class="btn btn-outline-primary" @click="prevMonth">◀</button>
      <h4>{{ year }}년 {{ month + 1 }}월</h4>
      <button class="btn btn-outline-primary" @click="nextMonth">▶</button>
    </div>
    <table class="table table-bordered text-center">
      <thead class="table-light">
        <tr>
          <th v-for="day in days" :key="day" :class="{ 'text-success': true }">
            {{ day }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, wIdx) in weeks" :key="wIdx">
          <td
            v-for="(date, dIdx) in week"
            :key="dIdx"
            @click="selectDate(date)"
            class="position"
            :class="{ today_highlight: isToday(date) }"
            style="height: 100px; cursor: pointer"
          >
            <div v-if="date">
              <strong>{{ date }}</strong>
              <div
                v-if="getDailySummary(date).income"
                class="text-primary small"
              >
                +{{ getDailySummary(date).income }}
              </div>
              <div
                v-if="getDailySummary(date).expense"
                class="text-danger small"
              >
                -{{ getDailySummary(date).expense }}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- <div class="text-end my-3">
      <h5>
        총 수입: <span class="text-primary">+{{ totalSummary.income.toLocaleString() }}</span>
      </h5>
      <h5>
        총 지출: <span class="text-danger">-{{ totalSummary.expense.toLocaleString() }}</span>
      </h5>
    </div> -->
  </div>
</template>

<style scoped>
.table {
  width: 84rem;
  border-radius: 30px;
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
  color: --point-1-color;
}
.today_highlight {
  background-color: rgba(153, 188, 133, 0.7);
  color: white;
}
</style>
