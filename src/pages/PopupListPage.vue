<template>
  <div class="ledger-container">
    <!-- 목록/달력 토글 & 검색/필터 영역 -->
    <!-- 테이블 영역 -->
    <section class="ledger-table-section">
      <table class="ledger-table">
        <thead>
          <tr>
            <!-- 선택삭제용 체크박스 열 -->
            <!-- 아직 구현 X -->
            <th style="width: 40px"><input type="checkbox" /></th>
            <th style="width: 120px">날짜</th>
            <th style="width: 120px">카테고리</th>
            <th>내용</th>
            <th style="width: 120px">금액</th>
            <th style="width: 60px">수정</th>
            <th style="width: 60px">삭제</th>
          </tr>
        </thead>
        <tbody>
          <!-- 필터 상태에 따라 페이징된 거래 목록 렌더링 -->
          <tr v-for="record in filteredByDate" :key="record.id">
            <!-- 선택삭제 체크박스 -->
            <td>
              <input
                type="checkbox"
                v-model="record.selected"
                style="width: 16px; height: 16px"
              />
            </td>
            <td>{{ record.date }}</td>
            <td>{{ record.category }}</td>
            <td>{{ record.description }}</td>
            <td>{{ formatAmount(record.amount, record.type) }}</td>
            <!-- 수정 아이콘 -->
            <td>
              <i
                class="icon-edit"
                @click="handleEdit(record)"
                style="cursor: pointer"
                >✏️</i
              >
            </td>
            <!-- 삭제 아이콘 -->
            <td>
              <i
                class="icon-delete"
                @click="handleDelete(record.id)"
                style="cursor: pointer"
                >🗑️</i
              >
            </td>
          </tr>
        </tbody>
      </table>
      <button class="closepopuplist" @click="closepopuplist" />
    </section>

    <!-- 하단 '추가' 버튼 -->
    <!-- <AddListBtn /> -->
    <!-- <div class="add-button-area">
      <router-link to="/popup" class="add-button">추가 +</router-link> -->
    <!-- <button class="add-button">추가</button> -->
    <!-- </div> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTransactionStore } from '@/stores/TransactionStore'
import { useRoute } from 'vue-router'
// import

// 달력,AddListBtn import
import CalendarContent from '@/components/CalendarContent.vue'
import AddListBtn from '@/components/AddListBtn.vue'

const transactionStore = useTransactionStore()
const route = useRoute()

console.log('날짜:', route.query.date) // console.log(route.params.id)
//달력 showCalendar, openCalendar
// const showCalendar = ref(false)

// const openCalendar = () => {
//   showCalendar.value = true
// }

// 페이지 로드 시 거래 내역 불러오기
onMounted(() => {
  transactionStore.fetchTransactions()
})

// 필터 상태: 수입/지출 (기본: 모두 체크)
const showIncome = ref(true)
const showExpense = ref(true)

// 필터링된 거래 내역 목록 (수입/지출 체크 상태에 따라)
const filteredTransactions = computed(() => {
  return transactionStore.transactions.filter(record => {
    if (record.type === '수입' && showIncome.value) return true
    if (record.type === '지출' && showExpense.value) return true
    return false
  })
})

const selectedDate = ref(route.query.date || '')
console.log('선택요일:', selectedDate.value)
onMounted(() => {
  transactionStore.fetchTransactions()
})

// 날짜 기준으로 필터링
const filteredByDate = computed(() => {
  return transactionStore.transactions.filter(
    t => t.date === selectedDate.value,
  )
})

console.log('선택된 날짜:', selectedDate.value)
// console.log('전체 거래 내역:', transactionStore.transactions)
console.log('필터된 결과:', filteredByDate.value)

// 금액 포맷 함수:
// - value를 숫자로 변환하고,
// - 거래 유형에 따라 '수입'은 '+' 기호, '지출'은 '-' 기호 추가
function formatAmount(value, type) {
  const num = parseFloat(value)
  if (isNaN(num)) return value
  const formatted = num.toLocaleString()
  return type === '수입'
    ? `+${formatted}`
    : type === '지출'
      ? `-${formatted}`
      : formatted
}

// 수정 아이콘 클릭 시 처리 (수정 페이지로 이동)
function handleEdit(record) {
  router.push({ name: 'Popup', params: { id: record.id } })
}

// 삭제 아이콘 클릭 시 처리 (삭제 확인 후 삭제)
function handleDelete(id) {
  if (window.confirm('정말 삭제하시겠습니까?')) {
    transactionStore.deleteTransaction(id)
  }
}
</script>

<style scoped></style>

<style scoped>
/* 기존 스타일 그대로 유지 */

/* 전체 컨테이너 */
.ledger-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: sans-serif;
  background-color: #fff;
}

/* 상단 연/월 네비게이션 */
.ledger-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  gap: 40px;
  background-color: #fff;
}
.month-nav {
  font-size: 1.1rem;
  color: #888;
  cursor: pointer;
}
.current-month {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.current-month .year {
  font-size: 1rem;
  color: #999;
}
.current-month .month {
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 2px;
}

/* 중간의 '목록/달력/카테고리/검색/수입/지출' 섹션 */
.ledger-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #a3c39c;
  padding: 10px 20px;
  color: #fff;
}
.nav-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.nav-btn {
  background: none;
  border: none;
  color: #fff;
  font-weight: bold;
  padding: 8px 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}
.nav-btn.active,
.nav-btn:hover {
  background-color: #8eb58d;
}
.category-select {
  background-color: #fff;
  color: #333;
  border: none;
  padding: 8px;
  border-radius: 4px;
}
.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
}
.search-input {
  width: 300px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  outline: none;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.income-checkbox,
.expense-checkbox {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

/* 테이블 영역 */
.ledger-table-section {
  padding: 20px;
  background-color: #f8f8f8;
}
.ledger-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.ledger-table thead {
  background-color: #e2e2e2;
}
.ledger-table th,
.ledger-table td {
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #eee;
}
.ledger-table th {
  font-weight: bold;
  font-size: 0.9rem;
  color: #333;
}
.ledger-table td {
  font-size: 0.88rem;
  color: #555;
}
.ledger-table td i {
  cursor: pointer;
}

/* 페이징 컨트롤 */
.pagination-controls button {
  padding: 6px 12px;
  margin: 0 6px;
  border: none;
  background-color: #a3c39c;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.pagination-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 하단 '추가' 버튼 영역 */
.add-button-area {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
}
.add-button {
  background-color: #a3c39c;
  color: #fff;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.add-button:hover {
  background-color: #8eb58d;
}
.closepopuplist {
  background-color: var(--point-1-color);
  color: white;
}
</style>
