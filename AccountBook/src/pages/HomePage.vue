<script setup>
import { onMounted, computed } from 'vue'
import CalendarContent from '@/components/CalendarContent.vue'
import SummaryCard from '@/components/SummaryCard.vue'
import { statisticsStore } from '@/stores/statisticsStore'
import { storeToRefs } from 'pinia'

const store = statisticsStore()
const { netProfitData } = storeToRefs(store)

// 여기서 computed로 감싸줘야 반응형 연결이 안정적이야
const totalIncome = computed(() => netProfitData.value.income ?? null)
const totalExpense = computed(() => netProfitData.value.expense ?? null)

onMounted(() => {
  // 데이터를 가져오고 통계도 계산되게
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
    />
  </div>
</template>
