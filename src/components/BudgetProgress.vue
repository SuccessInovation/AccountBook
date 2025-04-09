<template>
  <div class="BudgetProgress">
    <h2>{{ calendar.monthKey }} 예산 진척도</h2>

    <div
      v-for="item in progressData"
      :key="item.category"
      class="progress-item"
    >
      <div class="category-title">{{ item.name }}</div>

      <div class="bar-wrapper">
        <div class="percentage">
          {{ item.budget === 0 ? '-' : item.percent + '%' }}
        </div>

        <div class="bar-background">
          <div
            class="bar-fill"
            :style="{
              width: (item.budget === 0 ? '100' : item.percent) + '%',
              backgroundColor: '#3b82f6',
            }"
          ></div>
        </div>

        <div class="bar-text">
          <span>지출 {{ item.spent.toLocaleString() }}원</span>
          <span>예산 {{ item.budget.toLocaleString() }}원</span>
        </div>
      </div>
    </div>
    <button class="cab_btn" @click.prevent="budgetSetting">배추버튼</button>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
import { ref, onMounted, watch } from 'vue'
import { statisticsStore } from '@/stores/statisticsStore' // 경로 맞게 조정 필요
import { useBudgetStore } from '@/stores/UseBudgetStore'
import { use_calendar_store } from '@/stores/MonthSelector'
import { EXPENSE_CATEGORIES, CATEGORY_MAP } from '@/constants/categories'

const emit = defineEmits(['setting'])

const budgetSetting = () => {
  console.log('클릭됨')
  emit('setting')
}

const statics = statisticsStore()
const store = useBudgetStore()
const calendar = use_calendar_store()

// 입력 데이터 저장용
const progressData = ref([])

// 한 달 지출 불러오기
const loadExpensebyMonth = async (startDate, endDate, selectedMonth) => {
  const result = await statics.fetchRecordsByPeriod(startDate, endDate)
  const expenses = result.filter(exp => exp.type === '지출')

  const spendingByCategory = {}
  expenses.forEach(r => {
    const cat = r.category
    const amount = r.amount ?? 0
    spendingByCategory[cat] = (spendingByCategory[cat] || 0) + amount
  })

  await store.fetchBudgets(selectedMonth)
  const budgetByCategory = Object.fromEntries(
    store.budgets.map(b => [b.category, b.amount]),
  )

  progressData.value = EXPENSE_CATEGORIES.map(cat => {
    const spent = spendingByCategory[cat] || 0
    const budget = budgetByCategory[cat] || 0
    const percent =
      budget === 0 ? 0 : Math.min(100, ((spent / budget) * 100).toFixed(1))
    return {
      category: cat,
      name: CATEGORY_MAP[cat],
      spent,
      budget,
      percent,
    }
  })
}

// mount 될 때 한 번 실행
onMounted(() => {
  loadExpensebyMonth(calendar.startDate, calendar.endDate, calendar.monthKey)
})

// 달 변경되면 자동으로 다시 계산
watch(
  () => [calendar.startDate, calendar.endDate, calendar.monthKey],
  () => {
    loadExpensebyMonth(calendar.startDate, calendar.endDate, calendar.monthKey)
  },
)
</script>

<style scoped>
.cab_btn {
  border: 1px solid blue;
}
.cab_btn:hover {
  background-color: blue;
  color: white;
}
div {
  border: 1px solid lightgray;
}

.BudgetProgress {
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
}

.progress-item {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 20px;
  font-family: 'Pretendard', sans-serif;
}

.category-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
}

.bar-wrapper {
  position: relative;
  width: 100%;
}

.percentage {
  position: absolute;
  top: -20px;
  left: 0;
  font-size: 14px;
  color: #3b82f6;
  font-weight: 600;
}

.bar-background {
  width: 100%;
  height: 16px;
  background-color: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background-color: #3b82f6;
  border-radius: 999px;
  transition: width 0.3s ease;
}

.bar-text {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 14px;
  color: #333;
}
</style>
