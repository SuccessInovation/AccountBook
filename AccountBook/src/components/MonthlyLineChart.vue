<template>
  <div v-if="chartData" class="chart_wrapper">
    <!-- <p>월별 지출 추이</p> -->
    <Line :data="chartData" :options="chartOptions" />
  </div>
  <div v-else>데이터를 불러오는 중...</div>
</template>
<script setup>
// Chart.js, vue-chartjs import
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { computed } from 'vue'
import { toRefs } from 'vue'
// Chart.js 플러그인 등록
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
)
// props 받기
const props = defineProps({
  monthlyExpenses: {
    type: Object,
    required: true,
  },
})
// reactive props 구조 분해
const { monthlyExpenses } = toRefs(props)
// 차트 데이터
const chartData = computed(() => {
  if (
    !monthlyExpenses.value ||
    Object.keys(monthlyExpenses.value).length === 0
  ) {
    return null
  }

  const labels = Object.keys(monthlyExpenses.value)
  const data = Object.values(monthlyExpenses.value)

  return {
    labels,
    datasets: [
      {
        label: '월별 지출',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: '#4CAF50',
        data,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#4CAF50',
        pointRadius: 5,
        pointBorderColor: '#388E3C',
        pointHoverBackgroundColor: '#2E7D32', // ✅ hover 시 포인트 배경
      },
    ],
  }
})

// 차트 옵션
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '월별 지출 추이',
      font: {
        size: 16,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}))
</script>
<style scoped>
/* p {
  margin-bottom: 1rem;
} */

.chart_wrapper {
  width: 100%;
  height: 300px;
  aspect-ratio: 4 / 3; /* 가로세로 비율 유지 */
  position: relative;
}
</style>
