<script setup>
// 홈페이지 내부 구성 : 월 선택 / 수입지출예산 요약 / 파이차트 그래프
import CalendarNav from '@/components/CalendarNav.vue'
import SummaryCard from '@/components/SummaryCard.vue'
import { useBudgetProgress } from '@/stores/useBudgetProgress'

// 수입 지출 예산 변수 store 함수 호출
const { rawTotalBudget, rawTotalIncome, rawTotalSpent } = useBudgetProgress()
</script>

<template>
  <div class="home">
    <CalendarNav />
    <!-- 값이 정의되었을 때만 렌더링 -->
    <SummaryCard
      :totalIncome="rawTotalIncome"
      :totalExpense="rawTotalSpent"
      :budget="rawTotalBudget"
    />
  </div>
</template>

<style scoped>
/* 홈페이지 중앙 정렬을 위한 스타일 */
.home {
  position: absolute;
  top: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
