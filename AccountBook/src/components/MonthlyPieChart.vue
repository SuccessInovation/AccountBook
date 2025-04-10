<template>
  <div class="chart_wrapper">
    <!-- <p>카테고리별 지출 비율</p> -->
    <!-- 차트 라이브러리에서 렌더링 -->
    <Pie :data="chartData" :options="chartOptions" />
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
// Computed Chart.js 가 이해할 수 있는 형태로 가공
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
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
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
</script>
<style scoped>
.chart_wrapper {
  width: 100%;
  height: 300px;
  aspect-ratio: 4 / 3; /* 가로세로 비율 유지 */
  position: relative;
}
</style>
