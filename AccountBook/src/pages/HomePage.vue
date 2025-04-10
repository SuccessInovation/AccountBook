<script setup>
import { onMounted, computed } from 'vue'
import CalendarContent from '@/components/CalendarContent.vue'
import SummaryCard from '@/components/SummaryCard.vue'
import { statisticsStore } from '@/stores/statisticsStore'
import { storeToRefs } from 'pinia'

const store = statisticsStore()
const { netProfitData } = storeToRefs(store)

// 계산된 속성으로 반응형 연결
// 수입 지출 예산
const totalIncome = computed(() => netProfitData.value.income ?? null)
const totalExpense = computed(() => netProfitData.value.expense ?? null)
// 파이차트
const categoryData = computed(() => netProfitData.value.expenseByCategory ?? {})
console.log('categoryData:', categoryData.value)
onMounted(() => {
  // 데이터를 가져와서 통계
  store.fetchRecords()
})
</script>

<template>
  <div class="home">
    <CalendarContent />
    <!-- 값이 정의되었을 때만 렌더링 -->
    <SummaryCard
      v-if="totalIncome !== null"
      :total-expense="totalExpense"
      :total-income="totalIncome"
      :budget="7000000"
      :monthly-data="categoryData"
    />
  </div>
</template>
