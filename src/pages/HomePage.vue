<script setup>
// import { statisticsStore } from '@/stores/statisticsStore'
// import { use_calendar_store } from '@/stores/MonthSelector'
// import { useBudgetStore } from '@/stores/UseBudgetStore'
// import { storeToRefs } from 'pinia'
// import { computed, watch } from 'vue'
import CalendarNav from '@/components/CalendarNav.vue'
import SummaryCard from '@/components/SummaryCard.vue'
import { useBudgetProgress } from '@/stores/useBudgetProgress'
// const store = statisticsStore()
// const calendar = use_calendar_store()
// const budgetStore = useBudgetStore()

// 총 예산 저장할 ref

// const { netProfitData, monthlyCategoryData } = storeToRefs(store)
// const { monthStartDate, monthEndDate, monthKey } = storeToRefs(calendar)

const { rawTotalBudget, rawTotalIncome, rawTotalSpent } = useBudgetProgress()

// 월 변경될 때마다 수입/지출, 예산 불러오기
// watch(
//   [monthStartDate, monthEndDate, monthKey],
//   async ([start, end, key]) => {
//     if (start && end && key) {
//       // 해당 월의 수입/지출 데이터 불러오기
//       await store.fetchTransactionsByPeriod(start, end)
//       // 해당 월의 예산 데이터 불러오기
//       await budgetStore.fetchBudgets(key)

//       // 불러온 예산 데이터 합산해서 totalBudget에 저장
//       totalBudget.value = budgetStore.budgets.reduce(
//         (sum, item) => sum + item.amount,
//         0,
//       )
//     }
//   },
//   { immediate: true },
// )
// 중복 불필요
// onMounted(async () => {
//   store.fetchTranactionsByPeriod(monthStartDate.value, monthEndDate.value)
// })
// 계산된 속성으로 반응형 연결
// // 수입 지출 예산
// const totalIncome = computed(() => netProfitData.value.income ?? null)
// const totalExpense = computed(() => netProfitData.value.expense ?? null)
// // 파이차트
// const categoryData = computed(() => netProfitData.value.expenseByCategory ?? {})
// console.log('categoryData:', categoryData.value)
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
.home {
  position: absolute;
  top: 140px;
  /* height: calc(100% - (120px + 80px)); */
  width: calc(100% - 250px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
