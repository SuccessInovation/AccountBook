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
watch([calendar.monthStartDate, calendar.monthEndDate], async () => {
  await store.fetchRecordsByPeriod(
    calendar.monthStartDate,
    calendar.monthEndDate,
  )
  store.calculateStatistics()
})
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
