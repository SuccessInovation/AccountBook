<script setup>
import { defineEmits, ref, onMounted } from 'vue'
import { EXPENSE_CATEGORIES, CATEGORY_MAP } from '@/constants/categories'
import { useBudgetStore } from '@/stores/UseBudgetStore'
import axios from 'axios'

const store = useBudgetStore()

const emit = defineEmits(['close', 'submit'])

// 현재 월 구하기
const date = new Date()
const year = date.getFullYear()
const month = String(date.getMonth() + 1).padStart(2, '0') // 0~11이니까 +1

const currentMonth = `${year}-${month}`

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
      await axios.put(`http://localhost:3000/budgets/${existing.id}`, payload)
    } else {
      // POST 요청 (새 항목 추가)
      await axios.post('http://localhost:3000/budgets', payload)
    }
  }

  await store.fetchBudgets() // 저장 후 store 재갱신
  emit('submit')
  emit('close')
  alert('예산이 저장되었습니다.')
}
</script>

<template>
  <div class="BudgetSetting">
    <div class="budget_popup">
      <p>예산 설정 페이지입니다.</p>
      <h2>예산 설정</h2>
      <!-- 예산 리스트 불러오기 -->
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
        <span>원</span>
      </div>
      <!--버튼 영역 -->
      <div class="buttons">
        <button class="popup_btn" @click="handleSubmit">확인</button>
        <button class="popup_btn" @click="handleCancel">취소</button>
      </div>
    </div>
  </div>
</template>

<style scope>
.BudgetSetting {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999; /* 다른 컴포넌트 위에 오게 함 */
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4); /* 반투명 딤드 처리 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.budget_popup {
  background-color: white;
  border: 1px solid black;
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.popup_btn {
  width: 100px;
  background-color: white;
  color: black;
  border: 1px solid black;
}
.popup_btn:hover {
  background: #333;
}
.buttons * {
  margin: 10px;
}
input {
  border: 1px solid black;
}

/* 스핀 버튼 제거 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
