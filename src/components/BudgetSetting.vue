<script setup>
import { defineEmits, ref, onMounted, onBeforeUnmount } from 'vue'
import { EXPENSE_CATEGORIES, CATEGORY_MAP } from '@/constants/categories'
import { useBudgetStore } from '@/stores/UseBudgetStore'
import { use_calendar_store } from '@/stores/MonthSelector'
import axios from 'axios'
import { BASE_URI } from '@/constants/api'

const store = useBudgetStore()

const emit = defineEmits(['close', 'submit'])

const calendar = use_calendar_store()

const currentMonth = calendar.monthKey

// 카테고리 불러오기
const categoryData = ref(
  EXPENSE_CATEGORIES.map(key => ({
    category: key,
    name: CATEGORY_MAP[key],
    amount: 0,
    focused: false,
  })),
)

// 기존 budget 중 이번 달에 해당하는 것 필터링
const existingBudgets = ref([])

onMounted(async () => {
  await store.fetchBudgets(currentMonth) // 현재 월을 넘겨줌
  existingBudgets.value = store.budgets

  console.log('불러온 예산:', store.budgets)
  console.log('현재 월:', currentMonth)

  // 어떤 함수인지?
  categoryData.value.forEach(item => {
    const matched = existingBudgets.value.find(
      b => b.category === item.category,
    )
    if (matched) {
      item.amount = matched.amount
    }
  })
})

// focus 시 기본 금액 0을 공백으로 초기화
const handleFocus = item => {
  item.focused = true
  if (item.amount === 0) item.amount = ''
}

// 아무것도 입력 안했을 시 기본 금액 0으로 초기화
const handleReset = item => {
  item.focused = false
  if (item.amount === '') item.amount = 0
}

// 확인/취소
const handleCancel = () => {
  emit('close')
}
// 저장 (POST 또는 PUT)
const handleSubmit = async () => {
  for (const item of categoryData.value) {
    const existing = existingBudgets.value.find(
      b => b.category === item.category,
    )

    const payload = {
      category: item.category,
      amount: Number(item.amount),
      month: currentMonth,
    }

    if (existing) {
      // PUT 요청 (기존 항목 업데이트)
      await axios.put(`${BASE_URI}/budgets/${existing.id}`, payload)
    } else {
      // POST 요청 (새 항목 추가)
      await axios.post(`${BASE_URI}/budgets`, payload)
    }
  }
  await store.fetchBudgets() // 저장 후 store 재갱신
  emit('submit')
  emit('close')
  alert('예산이 저장되었습니다.')
}
const resetBudget = async () => {
  if (!confirm('정말로 예산을 초기화하시겠습니까?')) return

  // 1. 현재 달 예산 불러오기
  await store.fetchBudgets(currentMonth)
  const budgets = store.budgets

  // 2. 예산 모두 0으로 초기화 (PUT 요청)
  const resetRequests = budgets.map(b => {
    return axios.put(`${BASE_URI}/budgets/${b.id}`, {
      ...b,
      amount: 0,
    })
  })

  await Promise.all(resetRequests)

  // 3. 화면 입력값도 초기화
  categoryData.value.forEach(item => {
    item.amount = 0
  })
}
const handleKeyup = event => {
  if (event.key === 'Escape') {
    handleCancel()
  } else if (event.key === 'Enter') {
    handleSubmit()
  }
}
onMounted(() => {
  window.addEventListener('keyup', handleKeyup)
})

onBeforeUnmount(() => {
  window.removeEventListener('keyup', handleKeyup)
})
</script>

<template>
  <div class="BudgetSetting">
    <div class="budget_popup">
      <div class="setting_title">
        <h2>예산 설정</h2>
      </div>
      <!-- 예산 리스트 불러오기 -->
      <div class="category_container">
        <div
          v-for="item in categoryData"
          :key="item.category"
          class="category_item"
        >
          <span>{{ CATEGORY_MAP[item.category] }}</span>
          <input
            class="amount_input"
            type="number"
            :value="item.amount === 0 && item.focused ? '' : item.amount"
            @focus="handleFocus(item)"
            @blur="handleReset(item)"
            @input="e => (item.amount = Number(e.target.value))"
          />
          <span class="won">원</span>
        </div>
      </div>
      <!--버튼 영역 -->
      <div class="buttons">
        <button class="popup_btn" @click="handleSubmit">확인</button>
        <button class="popup_btn" @click="handleCancel">취소</button>
        <button class="popup_btn reset-btn" @click="resetBudget">
          예산 초기화
        </button>
      </div>
    </div>
  </div>
</template>

<style scope>
.BudgetSetting {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.budget_popup {
  background-color: white;
  border: none;
  width: 450px;
  height: 730px;
  border-radius: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  flex-direction: column;
}
/* 제목 */
.setting_title {
  margin: 2.5rem;
  padding: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
}
/* 리스트 */
.category_container {
  width: 80%;
  max-height: 430px;
  overflow-y: auto;
  padding-right: 10px;
}

.category_container::-webkit-scrollbar {
  width: 0.625rem;
  background-color: var(--input-box-color);
  border-radius: 10px;
}
.category_container::-webkit-scrollbar-thumb {
  background-color: var(--point-1-color);
  border-radius: 10px;
}
/* 카테고리 별 아이템 */
.category_item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.25rem;
}
.amount_input {
  background-color: var(--input-box-color);
  width: 10rem;
  height: 2rem;
  flex: 2;
  padding: 0 0.5rem;
  border-radius: 0.375rem;
  border: none;
  text-align: center;
  color: var(--font-color);
  display: inline-block;
}
.category_item span:first-child {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 1rem;
}
.category_item span:last-child {
  width: 2rem;
  text-align: right;
}
.won {
  position: absolute;
  right: 12px;
  color: var(--font-color);
  opacity: 50%;
}

/* 버튼 */
.popup_btn {
  width: 100%;
  height: 2.75rem;
  background-color: var(--point-1-color);
  color: var(--very-light-brown);
  border: none;
  border-radius: 0.375rem;
  margin: 0.625rem 0;
  cursor: pointer;
}
.popup_btn:hover {
  background: var(--dark-brown);
}
.buttons {
  display: grid;
  grid-template-columns: repeat(2, 160px);
  row-gap: 0.625rem;
  column-gap: 0.625rem;
}

.reset-btn {
  grid-column: span 2;
  margin: 0;
}
/* 스핀 버튼 제거 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
