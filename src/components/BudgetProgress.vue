<template>
  <div class="budget_progress">
    <div class="budget_title">
      <h2>{{ calendar.current_month + 1 }}월 총예산</h2>
      <div class="btn_wrap">
        <button class="cab_btn" @click.prevent="budgetSetting">
          <img src="../img/cabbage/배추9.png" alt="예산설정버튼" />
          <span class="btn_txt"><strong>예산설정</strong></span>
        </button>
      </div>
    </div>
    <div v-if="progressData.length === 0" class="progress_data_box">
      <!-- 예산이 없는 경우 -->
      <div class="no-budget-box">
        <p>이번 달 예산이 설정되지 않았어요</p>
        <img src="../img/cabbage/logo1.png" alt="배추이미지" />
      </div>
    </div>
    <!-- 전체 진척도 Bar -->
    <div v-else class="overall-progress">
      <div class="bar-wrapper">
        <div class="percentage">
          {{ totalBudget === 0 ? '-' : overallPercent + '%' }}
        </div>
        <div class="bar-background">
          <div
            class="bar-fill"
            :style="{
              width: (totalBudget === 0 ? '100' : overallPercent) + '%',
              backgroundColor: 'var(--point-1-color)', // 연한 초록 계열
            }"
          ></div>
        </div>
        <div class="bar-text">
          <span>{{ totalSpent.toLocaleString() }}원 지출</span>
          <span>예산 {{ totalBudget.toLocaleString() }}원</span>
        </div>
      </div>
    </div>
    <div
      :class="[
        'progress-list',
        progressData.length <= 3 ? 'one-column' : 'two-column',
      ]"
    >
      <div
        v-for="item in progressData"
        :key="item.category"
        class="progress-item"
      >
        <div class="category-title">
          <span>아이콘</span>
          {{ item.name }}
          <div class="percentage">
            {{ item.budget === 0 ? '-' : item.percent + '%' }}
          </div>
        </div>
        <div class="bar-wrapper">
          <div class="bar-background">
            <div
              class="bar-fill"
              :style="{
                width: (item.budget === 0 ? '100' : item.percent) + '%',
              }"
            ></div>
          </div>
          <div class="bar-text">
            <span>{{ item.spent.toLocaleString() }}원 지출</span>
            <span>예산 {{ item.budget.toLocaleString() }}원</span>
          </div>
        </div>
      </div>
    </div>
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
const totalBudget = ref(0)
const totalSpent = ref(0)
const overallPercent = ref(0)

// 한 달 지출 불러오기
const loadExpensebyMonth = async (startDate, endDate, selectedMonth) => {
  const result = await statics.fetchTranactionsByPeriod(startDate, endDate)
  const expenses = result.filter(exp => exp.type === 'expense')
  console.log('📊 지출 항목:', expenses)

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

  progressData.value = EXPENSE_CATEGORIES.filter(
    cat => (budgetByCategory[cat] || 0) > 0,
  ).map(cat => {
    const spent = spendingByCategory[cat] || 0
    const budget = budgetByCategory[cat] || 0
    const percent = Math.min(100, ((spent / budget) * 100).toFixed(1))
    return {
      category: cat,
      name: CATEGORY_MAP[cat],
      spent,
      budget,
      percent,
    }
  })
  // ⬇️ 이거 추가
  totalBudget.value = progressData.value.reduce(
    (sum, item) => sum + item.budget,
    0,
  )
  totalSpent.value = progressData.value.reduce(
    (sum, item) => sum + item.spent,
    0,
  )
  overallPercent.value =
    totalBudget.value === 0
      ? 0
      : Math.min(100, ((totalSpent.value / totalBudget.value) * 100).toFixed(1))
}
// 📌 외부에서 호출할 수 있게 expose
const refresh = () => {
  loadExpensebyMonth(calendar.startDate, calendar.endDate, calendar.monthKey)
}
defineExpose({ refresh })

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
.budget_title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center; /* 제목(h2)을 가운데로 보냄 */
  padding: 0 2rem; /* 좌우 여유 */
}

.budget_title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.375rem auto;
  padding: 1rem 0;
}

.btn_wrap {
  position: absolute;
  right: 0;
}

.cab_btn {
  align-items: center;
  width: 3rem;
  cursor: pointer;
}
.cab_btn > span {
  color: var(--point-1-color);
  text-decoration: underline;
}
.cab_btn:hover {
  background-color: var(--point-5-color);
}
.btn_txt {
  font-size: 0.75rem;
}

.budget_progress {
  border: 1rem solid var(--point-3-color);
  border-radius: 1rem;
  padding: 20px;
  max-width: 900px;
  margin: 1.5rem auto;
}

.progress_data_box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.no-budget-box {
  text-align: center;
  width: 50%;
}
.progress-list {
  display: grid;
  gap: 1rem;
  max-height: 20rem;
  overflow-y: scroll;
  padding-right: 6px;
}

.progress-list.one-column {
  grid-template-columns: 1fr;
}

.progress-list.two-column {
  grid-template-columns: repeat(2, 1fr);
}

.progress-item {
  padding: 16px;
}

.category-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.bar-wrapper {
  width: 100%;
}

.percentage {
  display: inline;
  margin-left: 0.625rem;
  font-size: 14px;
  color: var(--font-color);
  opacity: 50%;
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
  background-color: var(--point-2-color);
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
.overall-progress {
  justify-self: center;
  width: 50%;
  margin-bottom: 2rem;
}
span {
  color: var(--font-color);
  font-weight: bold;
}
</style>
