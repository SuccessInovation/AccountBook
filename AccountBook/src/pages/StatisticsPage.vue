<template>
  <div class="statistics-page">
    <h2>통계</h2>
    <div class="charts">
      <MonthlyPieChart :monthly-data="store.monthlyCategoryData" />
      <MonthlyLineChart :monthly-expenses="store.monthlyExpenseData" />
    </div>
    <!-- <NetProfit :net-profit="store.netProfitData.netProfit" /> -->
    <NetProfit :net-profit="store.netProfitData?.netProfit ?? 0" />
  </div>
</template>

<script setup>
import { statisticsStore } from '@/stores/statisticsStore'
import { use_calendar_store } from '@/stores/MonthSelector'
import { onMounted, watch } from 'vue'
import MonthlyPieChart from '@/components/MonthlyPieChart.vue'
import MonthlyLineChart from '@/components/MonthlyLineChart.vue'
import NetProfit from '@/components/NetProfit.vue'

const store = statisticsStore()
const calendar = use_calendar_store()

// 페이지 로딩 시 최초 fetch + 계산
onMounted(async () => {
  await store.fetchRecordsByPeriod(
    calendar.monthStartDate,
    calendar.monthEndDate,
  )
  store.calculateStatistics()
})

// 선택된 월이 바뀌면 다시 fetch + 계산
// watch([calendar.monthStartDate, calendar.monthEndDate], async () => {
//   await store.fetchRecordsByPeriod(
//     calendar.monthStartDate,
//     calendar.monthEndDate,
//   )
//   store.calculateStatistics()
// })
// pinia store에서 속성은 반응형이지만, watch 에서는 일반 속성 값으로 보기에 관찰할 수 없음
// watch()는 ref, computed, reactive, 또는 getter 함수(() => ...)만 감시 대상으로 허용
// calendar.monthStartDate를 바로 넣으면 undefined 취급되고 경고 발생
watch(
  [() => calendar.monthStartDate, () => calendar.monthEndDate],
  async () => {
    if (!calendar.monthStartDate || !calendar.monthEndDate) return

    await store.fetchRecordsByPeriod(
      calendar.monthStartDate,
      calendar.monthEndDate,
    )
    store.calculateStatistics()
  },
)
</script>

<style scoped>
.statistics-page {
  padding: 2rem;
}
.charts {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}
</style>
