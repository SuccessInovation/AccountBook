<script setup>
import { ref, onMounted } from 'vue'

// Props: mode ('create' 또는 'edit'), initialData (수정 시 기존 데이터), transactionType (수입/지출)
const props = defineProps({
  mode: { type: String, default: 'create' },
  initialData: { type: Object, default: () => ({}) },
  transactionType: { type: String, default: 'expenses' },
})
const emit = defineEmits(['submit'])

// 로컬 상태: 폼 데이터를 관리하며, 수정 시 기존 데이터를 복사합니다.
const localData = ref({
  date: '',
  amount: '',
  category: '',
  payment: '',
  memo: '',
})

onMounted(() => {
  if (props.mode === 'edit' && Object.keys(props.initialData).length > 0) {
    localData.value = { ...props.initialData }
  }
})

// 폼 제출 시 상위 컴포넌트에 데이터를 emit합니다.
function handleSubmit() {
  emit('submit', localData.value)
}
</script>

<!-- ===================================== -->
<!-- 아직 컴포넌트와 페이지 제대로 분리 못함 -->
<!-- ===================================== -->
<template>
  <form @submit.prevent="handleSubmit" class="transaction-add-form">
    <!-- 날짜 입력 -->
    <input type="date" v-model="localData.date" required />
    <!-- 금액 입력 -->
    <input type="text" placeholder="금액" v-model="localData.amount" required />
    <!-- 카테고리 선택: 거래 유형에 따라 분기 처리 -->
    <template v-if="transactionType === 'expenses'">
      <select v-model="localData.category" required>
        <option value="">카테고리 선택</option>
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
    </template>
    <template v-else-if="transactionType === 'income'">
      <select v-model="localData.category" required>
        <option value="">카테고리 선택</option>
        <option value="Salary">급여</option>
        <option value="Allowance">용돈</option>
        <option value="Financial">금융수입</option>
        <option value="Scholarship">장학금</option>
        <option value="etc">기타</option>
      </select>
    </template>
    <!-- 지출일 경우 결제 수단 선택 -->
    <template v-if="transactionType === 'expenses'">
      <select v-model="localData.payment" required>
        <option value="">결제 수단</option>
        <option value="creditCard">신용카드</option>
        <option value="cash">현금</option>
      </select>
    </template>
    <!-- 메모 입력 -->
    <textarea v-model="localData.memo" placeholder="메모"></textarea>
    <!-- 제출 버튼 -->
    <button type="submit">
      {{ mode === 'edit' ? '수정 완료' : '추가' }}
    </button>
  </form>
</template>

<style scoped>
.transaction-add-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.transaction-add-form input,
.transaction-add-form select,
.transaction-add-form textarea {
  margin-bottom: 8px;
  padding: 8px;
  font-size: 16px;
}
.transaction-add-form button {
  padding: 10px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
