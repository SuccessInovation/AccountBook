<!-- components/TransactionEdit.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const transactionId = route.params.id // URL에서 id 받아오기
console.log('받은 transactionId:', transactionId)

const formData = ref({
  date: '',
  amount: '',
  category: '',
  payment: '',
  memo: '',
})

// 거래 데이터 불러오기
onMounted(async () => {
  try {
    const res = await axios.get(
      `http://localhost:3000/records/${transactionId}`,
    )
    formData.value = res.data
    console.log('거래 데이터 불러옴:', res.data)
  } catch (err) {
    console.error('거래 데이터 불러오기 실패:', err)
  }
})

// 수정 요청 보내기
async function handleUpdate() {
  try {
    await axios.put(
      `http://localhost:3000/records/${transactionId}`,
      formData.value,
    )
    alert('수정 완료!')
    router.push({ name: 'Transaction' }) // 수정 후 거래 목록 페이지로 이동
  } catch (err) {
    alert('수정 요청 실패')
    console.error('수정 오류:', err)
  }
}

// 모달 닫기 (또는 수정 취소)
function closeModal() {
  router.push({ name: 'Transaction' })
}
</script>

<template>
  <div class="edit-overlay">
    <div class="edit-container">
      <h2>거래 수정</h2>
      <form @submit.prevent="handleUpdate">
        <!-- 수정할 거래 데이터 입력 (예시로 날짜, 금액, 메모) -->
        <input type="date" v-model="formData.date" />
        <input type="number" v-model="formData.amount" placeholder="금액" />
        <input type="text" v-model="formData.memo" placeholder="메모" />
        <button type="submit">수정 완료</button>
        <button type="button" class="closeBtn" @click="closeModal">X</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.edit-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.edit-container {
  width: 550px;
  height: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: sans-serif;
  position: relative;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
.edit-container form {
  display: flex;
  flex-direction: column;
}

.closeBtn {
  position: absolute;
  right: 24px;
  top: 24px;
  cursor: pointer;
  font-size: 24px;
}
</style>
