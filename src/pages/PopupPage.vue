<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { CATEGORY_MAP } from '@/constants/categories'

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

const router = useRouter()

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
  // 먼저 required 체크: 금액 필드가 비어있으면 필수 항목 오류를 남김
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
  // 전체 필드에 대한 검증: 날짜, 금액, 카테고리, (지출일 경우 결제 수단)
  checkRequired('date')
  checkAmount()
  checkRequired('category')
  if (transactionType.value === 'expenses') {
    checkRequired('payment')
  }

  // 필수 항목 오류가 있으면 제출 중단
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
    await axios.post('http://localhost:3000/records', dataToSend)
    alert('새 항목이 추가되었습니다!')
    // 폼 초기화 및 기본 상태 복원
    formData.value = {
      date: '',
      amount: '',
      category: '',
      payment: '',
      memo: '',
    }
    transactionType.value = 'expenses'
    router.push({ name: 'Transaction' })
  } catch (error) {
    console.error('거래 추가 오류:', error)
    alert('등록 중 오류가 발생했습니다.')
  }
}
</script>

<template>
  <div class="popup-page">
    <!-- 팝업 헤더 영역 -->
    <h1 style="text-align: center; margin-bottom: 16px">내역 추가</h1>

    <!-- 탭 영역: '지출' / '수입' 선택 -->
    <li
      style="
        display: flex;
        gap: 4px;
        list-style: none;
        padding: 0;
        width: 100%;
        margin-bottom: 16px;
        justify-content: space-between;
      "
    >
      <!-- '지출' 탭 -->
      <ul
        style="
          flex: 1;
          text-align: center;
          cursor: pointer;
          padding: 12px;
          border-radius: 4px;
          margin: 0 4px 0 0;
        "
        @click.prevent="transactionType = 'expenses'"
        :style="{
          backgroundColor:
            transactionType === 'expenses' ? '#47a447' : '#aedda9',
        }"
      >
        <span style="color: white; font-weight: bold">지출</span>
      </ul>
      <!-- '수입' 탭 -->
      <ul
        style="
          flex: 1;
          text-align: center;
          cursor: pointer;
          padding: 12px;
          border-radius: 4px;
          margin: 0 0 0 4px;
        "
        @click.prevent="transactionType = 'income'"
        :style="{
          backgroundColor: transactionType === 'income' ? '#47a447' : '#aedda9',
        }"
      >
        <span style="color: white; font-weight: bold">수입</span>
      </ul>
    </li>

    <!-- 입력 폼 -->
    <form
      novalidate
      @submit.prevent="handleSubmit"
      style="display: flex; flex-direction: column; gap: 12px"
    >
      <!-- 날짜 입력 -->
      <input
        type="date"
        v-model="formData.date"
        @blur="checkRequired('date')"
        style="padding: 8px; border-radius: 4px; border: 1px solid #ccc"
        required
      />
      <div v-if="errors.date" style="color: red; font-size: 12px">
        {{ errors.date }}
      </div>

      <!-- 금액 입력: @blur 호출 checkAmount -->
      <input
        type="text"
        placeholder="금액"
        v-model="formData.amount"
        @blur="checkAmount"
        style="padding: 8px; border-radius: 4px; border: 1px solid #ccc"
        required
      />
      <div v-if="errors.amount" style="color: red; font-size: 12px">
        {{ errors.amount }}
      </div>

      <!-- 카테고리 선택 -->
      <select
        v-model="formData.category"
        @blur="checkRequired('category')"
        style="padding: 8px; border-radius: 4px; border: 1px solid #ccc"
        required
      >
        <option value="">카테고리</option>
        <!-- 옵션의 value는 영어 값 -->
        <option value="Food">식비</option>
        <option value="CafeSnack">카페/간식</option>
        <option value="Entertainment">술/유흥</option>
        <option value="Shopping">쇼핑</option>
        <option value="Transportation">교통</option>
        <option value="Utilities">주거/통신</option>
        <option value="Health">의료/건강</option>
        <option value="Leisure">문화/여가</option>
        <option value="Travel">여행/숙박</option>
        <option value="Contributions">경조사/회비</option>
        <option value="Savings">저축</option>
        <option value="Education">교육</option>
        <option value="etc">기타</option>
      </select>
      <div v-if="errors.category" style="color: red; font-size: 12px">
        {{ errors.category }}
      </div>

      <!-- 결제 수단 (지출일 경우에만 표시) -->
      <select
        v-if="transactionType === 'expenses'"
        v-model="formData.payment"
        @blur="checkRequired('payment')"
        style="padding: 8px; border-radius: 4px; border: 1px solid #ccc"
        required
      >
        <option value="">결제 수단</option>
        <option value="creditCard">신용카드</option>
        <option value="cash">현금</option>
      </select>
      <div
        v-if="transactionType === 'expenses' && errors.payment"
        style="color: red; font-size: 12px"
      >
        {{ errors.payment }}
      </div>

      <!-- 메모 (선택 사항) - 선택사항이므로 에러 메시지 불필요 -->
      <textarea
        placeholder="메모"
        v-model="formData.memo"
        style="
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
          height: 60px;
        "
      ></textarea>

      <!-- 추가 버튼 -->
      <button
        type="submit"
        style="
          background-color: #47a447;
          color: white;
          padding: 12px 0;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          margin-top: 8px;
        "
      >
        추가 +
      </button>
    </form>
  </div>
</template>

<style scoped>
.popup-page {
  width: 350px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: sans-serif;
}
</style>
