<template>
  <div class="statistics-page">
    <h2>통계</h2>
    <!-- 월 선택 영역-->
    <div class="calendar_carousel">
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
    </div>

    <!-- 차트 영역 -->
    <div class="charts">
      <MonthlyPieChart :monthly-data="store.monthlyCategoryData" />
      <MonthlyLineChart :monthly-expenses="store.monthlyExpenseData" />
    </div>

    <!-- 순이익 영역 -->
    <!-- <NetProfit :net-profit="store.netProfitData.netProfit" /> -->
    <NetProfit
      :net-profit="store.netProfitData?.netProfit ?? 0"
      :income="store.netProfitData?.income ?? 0"
      :expense="store.netProfitData?.expense ?? 0"
    />
  </div>
</template>

<script setup>
import { statisticsStore } from '@/stores/statisticsStore'
import { use_calendar_store } from '@/stores/MonthSelector'
import { storeToRefs } from 'pinia' //이거 추가
import { onMounted, watch } from 'vue'
import MonthlyPieChart from '@/components/MonthlyPieChart.vue'
import MonthlyLineChart from '@/components/MonthlyLineChart.vue'
import NetProfit from '@/components/NetProfit.vue'

const store = statisticsStore()
const calendar = use_calendar_store()
// 아래 두 개 추가
const { visible_months } = storeToRefs(calendar) // ✅ 월 이동용
const month_names = calendar.month_names // ✅ 월 이름

// 페이지 로딩 시 최초 fetch + 계산
onMounted(async () => {
  await store.fetchTransactionsByPeriod(
    calendar.monthStartDate.value,
    calendar.monthEndDate.value,
  )
  store.calculateStatistics()
})

// 선택된 월이 바뀌면 다시 fetch + 계산
watch(
  () => [calendar.current_year, calendar.current_month, calendar.monthKey],
  async () => {
    await store.fetchTransactionsByPeriod(
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

/* ✅ 캘린더 월 이동 디자인 */
.calendar_carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.month_slider {
  display: flex;
  width: 500px;
  overflow: hidden;
  justify-content: space-between;
}

.month_item {
  width: 100px;
  text-align: center;
  font-size: 1.2rem;
  opacity: 0.6;
  transform: scale(0.9);
  transition: all 0.5s ease;
}

.month_item p {
  font-size: 2.5rem;
}

.faded {
  opacity: 0.4;
}
.active {
  font-weight: bold;
}

.month_item.active {
  font-size: 1.5rem;
  font-weight: bold;
  opacity: 1;
  transform: scale(1.1);
}

.arrow {
  font-size: 2rem;
  cursor: pointer;
  background: none;
  border: none;
  color: #4caf50;
  transition: transform 0.2s ease;
}
.arrow:hover {
  transform: scale(1.2);
}
</style>
