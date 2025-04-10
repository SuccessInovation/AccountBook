<template>
  <div class="statistics_page">
    <!-- 월 선택 컴포넌트 -->
    <CalendarContent />
    <!-- 본문 통계 영역 -->
    <div class="content_area">
      <!-- 상단 통계 영역 -->
      <div class="top_section">
        <MonthlyPieChart :monthly-data="store.monthlyCategoryData" />
        <div class="net_profit_box">
          <div class="net_profit_text">
            <NetProfit
              :net-profit="store.netProfitData?.netProfit ?? 0"
              :income="store.netProfitData?.income ?? 0"
              :expense="store.netProfitData?.expense ?? 0"
            />
          </div>
        </div>
      </div>
      <!-- 하단 통계 영역 -->
      <div class="bottom_section">
        <div class="chart_group">
          <div class="line_chart">
            <MonthlyLineChart :monthly-expenses="store.monthlyExpenseData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CalendarContent from '@/components/CalendarContent.vue'
import { statisticsStore } from '@/stores/statisticsStore'
import { use_calendar_store } from '@/stores/MonthSelector'
import { onMounted, watch } from 'vue'
import MonthlyPieChart from '@/components/MonthlyPieChart.vue'
import MonthlyLineChart from '@/components/MonthlyLineChart.vue'
import NetProfit from '@/components/NetProfit.vue'

// 통계 관련 데이터를 다루는 store 인스턴스 (거래 내역 fetch, 통계 계산)
const store = statisticsStore()
// 현재 선택된 월/연도를 관리하는 store 인스턴스 (기간 범위 등)
const calendar = use_calendar_store()

// 페이지 로드 시 데이터 fetch 및 통계 계산
onMounted(async () => {
  await store.fetchTransactionsByPeriod(
    calendar.monthStartDate,
    calendar.monthEndDate,
  )
  store.calculateStatistics()
})

// 선택된 월이 바뀌면 데이터 재요청 및 통계 재계산
watch(
  () => [calendar.current_year, calendar.current_month],
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
.statistics_page {
  padding: 0 20px 20px 20px;
}

/* 전체 영역 */
.content_area {
  border: 1rem solid var(--color-point-3);
  border-radius: 20px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* box-sizing: border-box; */
  overflow: hidden;
  background-color: var(--color-point-3);
}

.bottom_section,
.chart_group,
.net_profit_box {
  border-radius: 20px;
  background-color: white;
}

/* 상단 통계 영역 (원형차트 + 설명 + 순이익) */
.top_section {
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 500px;
}

.top_section > *:first-child {
  flex: 2; /* 전체 너비의 75% */
}

/* NetProfit 영역 */
.net_profit_box {
  /* flex: 1; */
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

/* 하단 영역 */
.bottom_section {
  /* display: flex;
  flex-direction: row; */
  gap: 20px;
  height: 400px;
}

/* 라인차트 */
.line_chart {
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  height: 400px;
}

/* 캘린더 슬라이더 시작 */
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
