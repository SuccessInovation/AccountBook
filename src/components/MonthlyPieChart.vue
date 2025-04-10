<template>
<<<<<<< HEAD
  <div>
    <h3>카테고리별 지출 비율</h3>
    <!-- 차트 라이브러리에서 렌더링 -->
    <Pie :data="chartData" :options="chartOptions" />
=======
  <div class="chart_wrapper">
    <div v-if="hasData" class="chart_wrap">
      <!-- 차트 라이브러리에서 렌더링 -->
      <div class="pie_chart">
        <Pie :data="chartData" :options="chartOptions" />
      </div>
      <div class="pie_description">
        <p>{{ currentMonth }}월의 소비 순위</p>
        <p>1위: {{ topCategories[0] ?? '데이터 없음' }}</p>
        <p>2위: {{ topCategories[1] ?? '데이터 없음' }}</p>
        <p>3위: {{ topCategories[2] ?? '데이터 없음' }}</p>
      </div>
    </div>
    <div v-else class="no_data">
      <p class="no_data_text">이번 달 지출 내역이 없습니다.</p>
    </div>
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
  </div>
</template>
<script setup>
// Chart.js, vue-chartjs import
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { computed } from 'vue'
import { toRefs } from 'vue'
// props 받기
const props = defineProps({
  monthlyData: {
    type: Object,
    required: true,
  },
})
// Chart.js 플러그인 등록
ChartJS.register(Title, Tooltip, Legend, ArcElement)
// reactive props 분리 (optional, 권장)
const { monthlyData } = toRefs(props)
<<<<<<< HEAD
// Computed Chart.js 가 이해할 수 있는 형태로 가공
=======

const hasData = computed(() => {
  return Object.values(monthlyData.value).reduce((acc, val) => acc + val, 0) > 0
})

// Computed Chart.js 가 이해할 수 있는 형태로 가공
// const chartData = computed(() => {
//   const labels = Object.keys(monthlyData.value)
//   const values = Object.values(monthlyData.value)
//   return {
//     labels,
//     datasets: [
//       {
//         label: '지출 금액',
//         data: values,
//         backgroundColor: [
//           '#FF6384',
//           '#36A2EB',
//           '#FFCE56',
//           '#4BC0C0',
//           '#9966FF',
//           '#FF9F40',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   }
// })

>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
const chartData = computed(() => {
  const labels = Object.keys(monthlyData.value)
  const values = Object.values(monthlyData.value)
  return {
    labels,
    datasets: [
      {
        label: '지출 금액',
        data: values,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        borderWidth: 1,
      },
    ],
  }
})
<<<<<<< HEAD
const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: false,
    },
  },
}))
</script>
<style scoped>
h3 {
  margin-bottom: 1rem;
=======

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 10, // 색상 박스 작게
        font: {
          size: 10, // 글씨 작게
        },
        padding: 8, // 간격 조금만
      },
    },
    title: {
      display: true,
      text: '카테고리별 지출 비율',
      font: {
        size: 16,
      },
    },
  },
}))

// ✅ Top 3 카테고리 계산
const topCategories = computed(() => {
  const entries = Object.entries(monthlyData.value)

  // 내림차순 정렬 후 top3 추출
  const sorted = entries.sort((a, b) => b[1] - a[1]).slice(0, 3)

  return sorted.map(([category]) => category)
})

// ✅ 현재 월 가져오기 (자동화)
import { use_calendar_store } from '@/stores/MonthSelector'
const calendar = use_calendar_store()
const currentMonth = computed(() => calendar.current_month + 1) // 0부터 시작하므로 +1
</script>
<style scoped>
.chart_wrapper {
  width: 100%;
  height: 300px;
  aspect-ratio: 4 / 3; /* 가로세로 비율 유지 */
  position: relative;
}

.chart_wrap {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pie_chart {
  width: 400px;
  height: 300px;
  border: 1px solid black;
}
/* 설명글 */
.pie_description {
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid black;
  min-width: 0;
  font-weight: bold;
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
}
</style>
