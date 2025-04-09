<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import {
  CATEGORY_MAP,
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
} from '@/constants/categories'

const API_URL = 'http://localhost:3000/records'

const records = ref([])
async function getRecords() {
  try {
    const response = await axios.get(API_URL)
    records.value = response.data
  } catch (error) {
    console.error('데이터 로딩 오류:', error)
  }
}

onMounted(() => {
  getRecords()
})

const emit = defineEmits(['close'])
function closeModal() {
  emit('close')
}

const transactionType = ref('expenses')

const formData = ref({
  date: '',
  amount: '',
  category: '',
  payment: '',
  memo: '',
})

// errors 객체: 각 필드에 대한 에러 메시지 저장
const errors = ref({
  date: '',
  amount: '',
  category: '',
  payment: '',
})

// checkRequired: 특정 필드가 비어있으면 "필수 항목입니다"를 할당
function checkRequired(field) {
  if (!formData.value[field]) {
    errors.value[field] = '필수 항목입니다'
  } else {
    errors.value[field] = ''
  }
}

// checkAmount: 금액 필드가 비어있지 않은 경우 숫자 여부 확인
function checkAmount() {
  if (!formData.value.amount) {
    errors.value.amount = '필수 항목입니다'
  } else {
    const num = parseFloat(formData.value.amount)
    if (isNaN(num)) {
      errors.value.amount = '숫자만 입력해주세요'
    } else {
      errors.value.amount = ''
    }
  }
}

async function handleSubmit() {
  // 전체 필드 검증: 날짜, 금액, 카테고리, (지출일 경우 결제 수단)
  checkRequired('date')
  checkAmount()
  checkRequired('category')
  if (transactionType.value === 'expenses') {
    checkRequired('payment')
  }

  if (
    errors.value.date ||
    errors.value.amount ||
    errors.value.category ||
    errors.value.payment
  ) {
    return
  }

  const dataToSend = {
    type: transactionType.value === 'expenses' ? '지출' : '수입',
    date: formData.value.date,
    amount: parseFloat(formData.value.amount),
    // CATEGORY_MAP을 사용해 카테고리 값을 한글로 매핑
    category: CATEGORY_MAP[formData.value.category],
    paymentMethod:
      transactionType.value === 'expenses' ? formData.value.payment : '',
    description: formData.value.memo,
    createdAt: new Date().toISOString(),
    id: String(Date.now()),
  }

  try {
    await axios.post(API_URL, dataToSend)
    alert('새 항목이 추가되었습니다!')
    records.value.unshift(dataToSend)
    closeModal()
    formData.value = {
      date: '',
      amount: '',
      category: '',
      payment: '',
      memo: '',
    }
    transactionType.value = 'expenses'
  } catch (error) {
    console.error('거래 추가 오류:', error)
    alert('등록 중 오류가 발생했습니다.')
  }
}
</script>

<template>
  <!-- 오버레이가 전체 화면을 덮으며 중앙에 팝업을 배치 -->
  <div class="popupOverlay" @click.self="closeModal">
    <div class="popupContainer">
      <h1 style="text-align: center; margin-bottom: 16px">내역 추가</h1>
      <button class="closeBtn" @click="closeModal">X</button>

      <!-- 탭 영역: '지출' / '수입' 선택 -->
      <div style="display: flex; gap: 4px; justify-content: space-between; margin-bottom: 16px;">
        <button
          style="flex: 1; padding: 12px; border-radius: 4px; margin-right: 4px; cursor: pointer; font-weight: bold; border: none;"
          @click.prevent="transactionType = 'expenses'"
          :style="{
            backgroundColor: transactionType === 'expenses' ? '#47a447' : '#aedda9',
            color: 'white'
          }"
        >
          지출
        </button>
        <button
          style="flex: 1; padding: 12px; border-radius: 4px; margin-left: 4px; cursor: pointer; font-weight: bold; border: none;"
          @click.prevent="transactionType = 'income'"
          :style="{
            backgroundColor: transactionType === 'income' ? '#47a447' : '#aedda9',
            color: 'white'
          }"
        >
          수입
        </button>
      </div>

      <!-- 입력 폼 -->
      <form novalidate @submit.prevent="handleSubmit" style="display: flex; flex-direction: column; gap: 12px">
        <!-- 날짜 입력 -->
        <div>
          <input
            type="date"
            v-model="formData.date"
            @blur="checkRequired('date')"
            style="padding: 8px; border-radius: 4px; border: 1px solid #ccc; width: 100%;"
            required
          />
          <div v-if="errors.date" style="color: red; font-size: 12px">
            {{ errors.date }}
          </div>
        </div>

        <!-- 금액 입력 -->
        <div>
          <input
            type="text"
            placeholder="금액"
            v-model="formData.amount"
            @blur="checkAmount"
            style="padding: 8px; border-radius: 4px; border: 1px solid #ccc; width: 100%;"
            required
          />
          <div v-if="errors.amount" style="color: red; font-size: 12px">
            {{ errors.amount }}
          </div>
        </div>

        <!-- 카테고리 선택 -->
        <div v-if="transactionType === 'expenses'">
          <select
            v-model="formData.category"
            @blur="checkRequired('category')"
            style="padding: 8px; border-radius: 4px; border: 1px solid #ccc; width: 100%;"
            required
          >
            <option value="">카테고리</option>
            <option v-for="(label, key) in EXPENSE_CATEGORIES" :key="key" :value="label">
              {{ CATEGORY_MAP[label] }}
            </option>
          </select>
          <div v-if="errors.category" style="color: red; font-size: 12px">
            {{ errors.category }}
          </div>
        </div>
        <div v-else>
          <select
            v-model="formData.category"
            @blur="checkRequired('category')"
            style="padding: 8px; border-radius: 4px; border: 1px solid #ccc; width: 100%;"
            required
          >
            <option value="">카테고리</option>
            <option v-for="(label, key) in INCOME_CATEGORIES" :key="key" :value="label">
              {{ CATEGORY_MAP[label] }}
            </option>
          </select>
          <div v-if="errors.category" style="color: red; font-size: 12px">
            {{ errors.category }}
          </div>
        </div>

        <!-- 결제 수단 (지출일 경우에만 표시) -->
        <div v-if="transactionType === 'expenses'">
          <select
            v-model="formData.payment"
            @blur="checkRequired('payment')"
            style="padding: 8px; border-radius: 4px; border: 1px solid #ccc; width: 100%;"
            required
          >
            <option value="">결제 수단</option>
            <option value="creditCard">신용카드</option>
            <option value="cash">현금</option>
          </select>
          <div v-if="errors.payment" style="color: red; font-size: 12px">
            {{ errors.payment }}
          </div>
        </div>

        <!-- 메모 (선택 사항) -->
        <div>
          <textarea
            placeholder="메모"
            v-model="formData.memo"
            style="padding: 8px; border-radius: 4px; border: 1px solid #ccc; width: 100%; height: 60px;"
          ></textarea>
        </div>

        <!-- 추가 버튼 -->
        <button
          type="submit"
          style="background-color: #47a447; color: white; padding: 12px 0; border-radius: 4px; border: none; cursor: pointer; font-weight: bold; margin-top: 8px;"
        >
          추가 +
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.popupOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4); /* 배경 딤 처리 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 다른 컴포넌트 위에 표시 */
}

.popupContainer {
  width: 350px;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: sans-serif;
  position: relative;
}

.closeBtn {
  position: absolute;
  right: 24px;
  top: 24px;
  cursor: pointer;
  font-size: 24px;
}
</style>
