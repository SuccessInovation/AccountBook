<template>
  <div class="budget_container">
    <!-- 제목 -->
    <div class="budget_title">
      <h2>{{ calendar.current_month + 1 }}월 총예산</h2>
      <div class="btn_wrap">
        <button class="setting_btn" @click.prevent="budgetSetting">
          <img src="../img/cabbage/배추9.png" alt="예산설정버튼" />
          <span class="btn_txt"><strong>예산설정</strong></span>
        </button>
      </div>
    </div>
    <!-- 예산이 없는 경우 -->
    <div v-if="progressData.length === 0" class="budget_box">
      <div class="no_budget">
        <p>이번 달 예산이 설정되지 않았어요</p>
        <img src="../img/cabbage/logo1.png" alt="배추이미지" />
      </div>
    </div>
    <!-- 예산이 있을 경우 -->
    <div v-else class="overall_progress">
      <div class="bar_wrapper">
        <div class="category_title">
          <div class="percentage">
            {{ totalBudget === 0 ? '-' : overallPercent + '%' }}
          </div>
          <span class="left_budget" :class="{ deficit: totalLeft < 0 }">
            {{
              (totalLeft < 0 ? totalLeft * -1 : totalLeft).toLocaleString()
            }}원
            {{ totalLeft < 0 ? '초과' : '남음' }}
          </span>
        </div>
        <div class="bar_background">
          <div
            class="bar_fill"
            :style="{
              width: (totalBudget === 0 ? '100' : overallPercent) + '%',
              backgroundColor: 'var(--color-point-1)',
            }"
          ></div>
        </div>
        <div class="bar_text">
          <span>{{ totalSpent.toLocaleString() }}원 지출</span>
          <span>예산 {{ totalBudget.toLocaleString() }}원</span>
        </div>
      </div>
    </div>
    <div
      :class="[
        'progress_list',
        progressData.length <= 3 ? 'one-column' : 'two-column',
      ]"
    >
      <!-- 카테고리 별 지출, 예산 진행률 리스트 -->
      <div
        v-for="item in expenseData.filter(e => e.budget > 0)"
        :key="item.category"
        class="progress_item"
      >
        <div class="category_title">
          <img class="category_icon" :src="item.icon" alt="{{item.name}}" />
          <span>{{ item.name }}</span>
          <div class="percentage">
            {{ item.budget === 0 ? '-' : item.percent + '%' }}
          </div>
          <span class="left_budget" :class="{ deficit: item.left < 0 }">
            {{
              (item.left < 0 ? item.left * -1 : item.left).toLocaleString()
            }}원
            {{ item.left < 0 ? '초과' : '남음' }}
          </span>
        </div>
        <div class="bar_wrapper">
          <div class="bar_background">
            <div
              class="bar_fill"
              :style="{
                width: (item.budget === 0 ? '100' : item.percent) + '%',
              }"
            ></div>
          </div>
          <div class="bar_text">
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
import {
  EXPENSE_CATEGORIES,
  CATEGORY_MAP,
  CATEGORY_IMG,
} from '@/constants/categories'

const emit = defineEmits(['setting'])

const budgetSetting = () => {
  console.log('클릭됨')
  emit('setting')
}

const statistics = statisticsStore()
const store = useBudgetStore()
const calendar = use_calendar_store()

// 입력 데이터 저장용
const progressData = ref([])

// @params = 전체 예산, 전체 지출, 전체 비율
const totalBudget = ref(0)
const totalSpent = ref(0)
const overallPercent = ref(0)
const totalLeft = ref(0)

//#region 함수 기능
/**
 * 한달 지출을 불러와서 카테고리별로 예산에 다른 지출 비율 계산 함수
 * @param {number} spent = 지출
 * @param {number} budget = 예산
 * @param {number} percent = 지출/예산 비율
 *return 카테고리명, 지출, 예산, 계산값
 */
const loadExpensebyMonth = async (startDate, endDate, selectedMonth) => {
  // 한 달의 데이터를 불러와서 지출만 expenses에 저장
  const result = await statistics.fetchTranactionsByPeriod(startDate, endDate)
  const expenses = result.filter(exp => exp.type === 'expense')

  // 카테코리 별 지출을 카테고리-금액으로 저장
  const spendingByCategory = {}
  expenses.forEach(r => {
    const cat = r.category
    const amount = r.amount ?? 0
    spendingByCategory[cat] = (spendingByCategory[cat] || 0) + amount
  })

  //   선택 월의 예산을 불러옴
  await store.fetchBudgets(selectedMonth)

  //   카테고리 별 예산을 저장
  const budgetByCategory = Object.fromEntries(
    store.budgets.map(b => [b.category, b.amount]),
  )

  //   ProgressData에 카테고리 별 지출, 예산, 비율을 계산하여 저장
  progressData.value = EXPENSE_CATEGORIES.filter(
    cat => (budgetByCategory[cat] || 0) > 0,
  ).map(cat => {
    const spent = spendingByCategory[cat] || 0
    const budget = budgetByCategory[cat] || 0
    const percent = Math.min(100, ((spent / budget) * 100).toFixed(1))
    const left = budget - spent
    return {
      category: cat,
      name: CATEGORY_MAP[cat],
      icon: CATEGORY_IMG[cat],
      spent,
      budget,
      percent,
      left,
    }
  })
  //   총 지출, 총 예산을 계산
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

  totalLeft.value = totalBudget.value - totalSpent.value
}

// endregion

// 외부에서 호출할 수 있게 expose
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
  () => [calendar.monthStartDate, calendar.monthEndDate, calendar.monthKey],
  () => {
    loadExpensebyMonth(
      calendar.monthStartDate,
      calendar.monthEndDate,
      calendar.monthKey,
    )
  },
)
</script>

<style scoped>
/* *** 제목, 예산설정 버튼 영역 시작 *** */
/* 제목 위치, 크기 */
.budget_title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.375rem auto;
  padding: 1rem 2rem;
}
/* 버튼 위치, 크기, 색상 */
.btn_wrap {
  position: absolute;
  right: 0;
}

.setting_btn {
  align-items: center;
  width: 3rem;
  cursor: pointer;
}
.setting_btn > span {
  color: var(--color-point-1);
  text-decoration: underline;
}
.setting_btn:hover {
  background-color: var(--color-point-5);
}
.btn_txt {
  font-size: 0.75rem;
}

/* *** 컨텐츠 박스 영역 *** */
/* 컨텐츠 박스 설정 */
.budget_container {
  border: 1rem solid var(--color-point-3);
  border-radius: 1rem;
  padding: 20px;
  max-width: 900px;
  height: 600px;
  margin: 1.5rem auto;
}

/* 예산이 없을 때 시작 */
.budget_box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.no_budget {
  width: 45%;
  text-align: center;
}

/* 예산이 설정되었을 때 시작 */
.overall_progress {
  justify-self: center;
  width: 50%;
  margin-bottom: 2rem;
}

/* 예산, 지출 비율 리스트 */
.progress_list {
  display: grid;
  gap: 1rem;
  max-height: 20rem;
  overflow-y: scroll;
  padding-right: 6px;
}

.progress_list.one-column {
  grid-template-columns: 1fr;
}

.progress_list.two-column {
  grid-template-columns: repeat(2, 1fr);
}

.progress_item {
  padding: 1rem;
}
.progress_list::-webkit-scrollbar {
  width: 0.625rem;
  background-color: var(--color-input-box);
  border-radius: 10px;
}
.progress_list::-webkit-scrollbar-thumb {
  background-color: var(--color-point-1);
  border-radius: 10px;
}
/* 카테고리명 */
.category_icon {
  width: 1rem;
}
.category_title {
  position: relative;
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  gap: 0.5rem;
}

.left_budget {
  position: absolute;
  right: 0;
}

.left_budget.deficit {
  color: var(--color-red-100);
}

/* 진행률 바 영역 */
.bar_wrapper {
  width: 100%;
}
/* 퍼센트 글씨 */
.percentage {
  display: inline;
  margin-left: 0.625rem;
  font-size: 14px;
  color: var(--color-font-main);
  opacity: 50%;
  font-weight: 600;
}
/* 회색 바 */
.bar_background {
  width: 100%;
  height: 1rem;
  background-color: var(--color-input-box);
  border-radius: 999px;
  overflow: hidden;
}
/* 진행률 표시 */
.bar_fill {
  height: 100%;
  background-color: var(--color-point-2);
  border-radius: 999px;
  transition: width 0.3s ease;
}
/* 지출, 예산 표시 */
.bar_text {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 14px;
  color: var(--color-font-main);
}
/* *** 제목, 예산설정 버튼 스타일 끝 *** */
</style>
