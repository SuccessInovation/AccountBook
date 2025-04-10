<template>
  <div v-if="chartData">
    <h3>월별 지출 추이</h3>
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
        borderColor: 'rgba(75, 192, 192, 1)',
        data,
        fill: false,
        tension: 0.1,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 5,
      },
    ],
  }
})

// 차트 옵션
const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '월별 지출 추이',
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
h3 {
  margin-bottom: 1rem;
}
</style>
