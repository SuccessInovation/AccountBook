<template>
  <div class="chart_group">
    <div v-if="hasData" class="chart_box">
      <div class="pie_chart">
        <!-- 차트 라이브러리에서 렌더링 -->
        <Pie :data="chartData" :options="chartOptions" />
      </div>

      <div class="pie_description">
        <p class="pie_title">{{ currentMonth }}월의 소비 순위</p>
        <p class="rank rank1">
          🥇 1위: {{ topCategories[0]?.label ?? '데이터 없음' }} ({{
            topCategories[0]?.percent ?? ''
          }}%)
        </p>
        <p class="rank rank2">
          🥈 2위: {{ topCategories[1]?.label ?? '데이터 없음' }} ({{
            topCategories[1]?.percent ?? ''
          }}%)
        </p>
        <p class="rank rank3">
          🥉 3위: {{ topCategories[2]?.label ?? '데이터 없음' }} ({{
            topCategories[2]?.percent ?? ''
          }}%)
        </p>
      </div>
    </div>
    <div v-else class="no_data">
      <p class="no_data_text">이번 달 지출 내역이 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
// Chart.js, vue-chartjs import
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { computed } from 'vue'
import { toRefs } from 'vue'
import { CATEGORY_MAP } from '@/constants/categories'

// import ChartDataLabels from 'chartjs-plugin-datalabels'
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

const hasData = computed(() => {
  return Object.values(monthlyData.value).reduce((acc, val) => acc + val, 0) > 0
})

const chartData = computed(() => {
  const labels = Object.keys(monthlyData.value).map(
    key => CATEGORY_MAP[key] ?? key,
  )
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
    options: {
      layout: {
        padding: {
          top: 0,
          bottom: 0,
        },
      },
    },
  },
}))

// ✅ Top 3 카테고리 계산
// const topCategories = computed(() => {
//   const entries = Object.entries(monthlyData.value)
//   const sorted = entries.sort((a, b) => b[1] - a[1]).slice(0, 3)

//   return sorted.map(([category]) => category)
// })
const topCategories = computed(() => {
  const entries = Object.entries(monthlyData.value)
  const total = Object.values(monthlyData.value).reduce(
    (acc, val) => acc + val,
    0,
  )

  return entries
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([category, value]) => ({
      key: category,
      label: CATEGORY_MAP[category] ?? category,
      value,
      percent: ((value / total) * 100).toFixed(1),
    }))
})

// ✅ 현재 월 가져오기 (자동화)
import { use_calendar_store } from '@/stores/MonthSelector'
const calendar = use_calendar_store()
const currentMonth = computed(() => calendar.current_month + 1) // 0부터 시작하므로 +1
</script>
<style scoped>
.chart_group {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  position: relative;
  justify-content: center;
  align-items: center;
  /* z-index: 2; */
  /* margin-left: 70px; */
}

/* 파이 차트 영역 */
.pie_chart {
  flex: 2;
  width: 400px;
  height: 400px;
  max-width: 450px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* border: 1px solid #ccc; */ /* 필요시 해제 */
}

/* 설명글 영역 */
.pie_description {
  flex: 1;
  width: 400px;
  height: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: flex-start; /* 텍스트 왼쪽 정렬 */
  min-width: 0;
  margin-right: 20px;
  font-weight: bold;
  line-height: 1.8;
  font-size: 18px;
  /* background-color: var(--color-brown-very-light);
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  color: var(--color-font-main);
  line-height: 1.8; */
}

.pie_title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--color-brown-dark);
  border-left: 5px solid var(--color-point-3);
  padding-left: 12px;
}

.rank {
  margin: 6px 0;
  font-size: 17px;
  font-weight: 600;
}

.rank1 {
  color: #f39c12; /* 금색 느낌 */
}

.rank2 {
  color: #95a5a6; /* 은색 느낌 */
}

.rank3 {
  color: #cd7f32; /* 동색 느낌 */
}

.chart_box {
  display: flex;
}
</style>
