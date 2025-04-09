<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTransactionStore } from '@/stores/TransactionStore'
import { useRouter } from 'vue-router'
import PopupPage from '@/pages/PopupPage.vue'
// TransactionEdit.vue는 수정페이지로 라우터 이동 시 사용되므로 여기서는 import할 필요가 없습니다.
// import TransactionEdit from '@/components/TransactionEdit.vue'

// 내역 추가하는 팝업창 상태 (초기값 : false)
const showPopup = ref(false)
function openPopup() {
  showPopup.value = true
}
function closePopup() {
  showPopup.value = false
}

// 거래 내역 관련 로직
const transactionStore = useTransactionStore()
const router = useRouter()

onMounted(() => {
  transactionStore.fetchTransactions()
})

// 필터 상태 (수입/지출 모두 체크)
const showIncome = ref(true)
const showExpense = ref(true)

// 필터된 거래 목록
const filteredTransactions = computed(() =>
  transactionStore.transactions.filter(record => {
    if (record.type === '수입' && showIncome.value) return true
    if (record.type === '지출' && showExpense.value) return true
    return false
  }),
)

// 페이징 관련 변수
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = computed(
  () => Math.ceil(filteredTransactions.value.length / pageSize.value) || 1,
)
const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredTransactions.value.slice(start, start + pageSize.value)
})

// 페이징 버튼 함수
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// 금액 포맷 함수 (수입이면 +로, 지출이면 -로 표현)
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

// 삭제 이벤트 처리
function handleDelete(id) {
  if (window.confirm('정말 삭제하시겠습니까?')) {
    transactionStore.deleteTransaction(id)
  }
}

// 수정 이벤트 처리 (라우터를 통해 수정 페이지로 이동)
// 기존에는 팝업 창을 사용했으나, 여기서는 라우터를 통한 이동 방식을 사용합니다.
function handleEdit(record) {
  console.log('수정할 거래 id:', record.id)
  router.push({
    name: 'TransactionEdit',
    params: { id: record.id },
  })
}
</script>

<template>
  <div class="ledger-container">
    <!-- 상단 연/월 네비게이션 영역 -->
    <header class="ledger-header">
      <div class="month-nav prev-month">MAR</div>
      <div class="current-month">
        <span class="year">2025</span>
        <span class="month">APRIL</span>
      </div>
      <div class="month-nav next-month">MAY</div>
    </header>

    <!-- 목록/달력 토글 & 검색/필터 영역 -->
    <nav class="ledger-nav">
      <div class="nav-left">
        <button class="nav-btn active">목록</button>
        <button class="nav-btn">달력</button>
        <select class="category-select">
          <option>카테고리</option>
          <option>식비</option>
          <option>교통</option>
          <option>생활</option>
        </select>
      </div>
      <div class="nav-center">
        <input type="text" class="search-input" placeholder="내역 검색" />
      </div>
      <!-- 수입/지출 항목 필터링 -->
      <div class="navRight">
        <label class="incomeCheckbox">
          <input type="checkbox" v-model="showIncome" />
          <span>수입</span>
        </label>
        <label class="expenseCheckbox">
          <input type="checkbox" v-model="showExpense" />
          <span>지출</span>
        </label>
      </div>
    </nav>

    <!-- 테이블 영역 -->
    <section class="ledgerTableSection">
      <table class="ledgerTable">
        <thead>
          <tr>
            <!-- 선택삭제용 체크박스 열 (아직 구현 X) -->
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
          <tr v-for="record in paginatedTransactions" :key="record.id">
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
            <td>{{ formatAmount(record.amount, record.type) }} 원</td>
            <td>
              <i
                class="icon-edit"
                @click="handleEdit(record)"
                style="cursor: pointer"
                >✏️</i
              >
            </td>
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

      <!-- 페이징 컨트롤 -->
      <div
        class="paginationControls"
        style="margin-top: 16px; text-align: center"
      >
        <button @click="prevPage" :disabled="currentPage === 1">이전</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          다음
        </button>
      </div>
    </section>

    <!-- 하단 '추가' 버튼 -->
    <div class="addButtonArea">
      <button class="addButton" @click="openPopup">추가 +</button>
    </div>

    <!-- 거래 추가 팝업 -->
    <PopupPage v-if="showPopup" @close="closePopup" />
    <!-- 거래 수정 팝업 제거: 수정은 라우터를 통해 TransactionEdit 페이지로 이동하므로 Popup 창을 사용하지 않습니다 -->
  </div>
</template>

<style scoped>
/* 기존 스타일 그대로 유지 */
.ledger-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: sans-serif;
  background-color: #fff;
}

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
.navRight {
  display: flex;
  align-items: center;
  gap: 10px;
}
.incomeCheckbox,
.expenseCheckbox {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.ledgerTableSection {
  padding: 20px;
  background-color: #f8f8f8;
}
.ledgerTable {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.ledgerTable thead {
  background-color: #e2e2e2;
}
.ledgerTable th,
.ledgerTable td {
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #eee;
}
.ledgerTable th {
  font-weight: bold;
  font-size: 0.9rem;
  color: #333;
}
.ledgerTable td {
  font-size: 0.88rem;
  color: #555;
}
.ledgerTable td i {
  cursor: pointer;
}

.paginationControls button {
  padding: 6px 12px;
  margin: 0 6px;
  border: none;
  background-color: #a3c39c;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.paginationControls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.addButtonArea {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
}
.addButton {
  background-color: #a3c39c;
  color: #fff;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.addButton:hover {
  background-color: #8eb58d;
}
</style>
