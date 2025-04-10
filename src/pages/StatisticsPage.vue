<template>
<<<<<<< HEAD
  <div class="statistics-page">
    <h2>통계</h2>
    <div class="charts">
      <MonthlyPieChart :monthly-data="store.monthlyCategoryData" />
      <MonthlyLineChart :monthly-expenses="store.monthlyExpenseData" />
    </div>
    <!-- <NetProfit :net-profit="store.netProfitData.netProfit" /> -->
    <NetProfit :net-profit="store.netProfitData?.netProfit ?? 0" />
=======
  <div class="statistics_page">
    <!-- 월 선택 영역 -->
    <div class="month_select_area">
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

    <!-- 본문 영역 -->
    <div class="content_area">
      <!-- 상단 통계 영역 -->
      <div class="top_section">
        <div class="chart_group">
          <div class="pie_chart">
            <MonthlyPieChart :monthly-data="store.monthlyCategoryData" />
          </div>
        </div>
        <div class="net_profit_box">
          <div class="net_profit_text">
            <!-- <NetProfit :net-profit="store.netProfitData?.netProfit ?? 0" /> -->
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
          <div class="line_description">설명글</div>
        </div>
      </div>
    </div>
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
  </div>
</template>

<script setup>
import { statisticsStore } from '@/stores/statisticsStore'
import { use_calendar_store } from '@/stores/MonthSelector'
<<<<<<< HEAD
=======
import { storeToRefs } from 'pinia'
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
import { onMounted, watch } from 'vue'
import MonthlyPieChart from '@/components/MonthlyPieChart.vue'
import MonthlyLineChart from '@/components/MonthlyLineChart.vue'
import NetProfit from '@/components/NetProfit.vue'

const store = statisticsStore()
const calendar = use_calendar_store()

<<<<<<< HEAD
// 페이지 로딩 시 최초 fetch + 계산
onMounted(async () => {
  await store.fetchRecordsByPeriod(
=======
const { visible_months } = storeToRefs(calendar) // 월 이동용
const month_names = calendar.month_names // 월 이름

// 페이지 로딩 시 최초 fetch + 계산
onMounted(async () => {
  await store.fetchTransactionsByPeriod(
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
    calendar.monthStartDate,
    calendar.monthEndDate,
  )
  store.calculateStatistics()
})

// 선택된 월이 바뀌면 다시 fetch + 계산
<<<<<<< HEAD
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
=======
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
  padding: 20px;
}

.month_select_area {
  display: flex;
  width: auto; /* or max-content / 300px 등으로 조정 가능 */
  overflow: hidden;
  justify-content: space-between;
  gap: 1rem;
}

/* 전체 영역 */
.content_area {
  border: 30px solid var(--color-point-3);
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

/* 상단 통계 영역 (파이 + 설명 + NetProfit) */
.top_section {
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 400px;
}

/* 파이차트와 설명글을 나란히 */
.chart_group {
  display: flex;
  flex-direction: row;
  flex: 3;
  gap: 10px;
  box-sizing: border-box;
}

/* 파이차트 영역 */
.pie_chart {
  flex: 2;
  /* border: 1px solid #ccc; */
  min-width: 0;
  max-width: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}

/* NetProfit 영역 */
.net_profit_box {
  /* margin: 20px; */
  flex: 1;
  /* border: 1px solid #ccc; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.net_profit_text {
  width: 100%;
  display: flex;
  flex: 1;
  border: 1px solid #ccc;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* 하단 영역 */
.bottom_section {
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 400px;
}

/* 라인차트 */
.line_chart {
  flex: 3;
  /* border: 1px solid #ccc; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}

/* 설명글 */
.line_description {
  flex: 1;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

/* 캘린더 월 이동 디자인 */
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
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
}
</style>
