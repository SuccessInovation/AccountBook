<!-- <template>
  <div class="statistics-page">
    <h2>통계</h2>
    <div class="charts">
      <MonthlyPieChart :monthly-data="store.monthlyCategoryData" />
      <MonthlyLineChart :monthly-expenses="store.monthlyExpenseData" />
    </div>
    <NetProfit :net-profit="store.netProfitData?.netProfit ?? 0" />
  </div>
</template> -->

<template>
  <div class="statistics_page">
    <!-- 월 선택 영역 -->
    <div class="month_select_area"></div>
    <!-- 본문 영역 -->
    <div class="content_area">
      <!-- 상단 통계 영역 -->
      <div class="top_section">
        <div class="chart_group">
          <div class="pie_chart">
            <MonthlyPieChart :monthly-data="store.monthlyCategoryData" />
          </div>
          <div class="pie_description">설명글</div>
        </div>
        <div class="net_profit_box">
          <div class="net_profit_img">
            <img src="#" alt="배추 img" />
          </div>
          <div class="net_profit_text">
            <NetProfit :net-profit="store.netProfitData?.netProfit ?? 0" />
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
.statistics_page {
  padding: 20px;
}

.month_select_area {
  height: 80px;
}

/* 전체 영역 */
.content_area {
  border: 30px solid var(--point-3-color);
  border-radius: 20px;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* box-sizing: border-box; */
  overflow: hidden;
  background-color: var(--point-3-color);
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}

/* 설명글 */
.pie_description {
  flex: 1;
  border: 1px solid #ccc;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
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

.net_profit_img,
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
</style>
