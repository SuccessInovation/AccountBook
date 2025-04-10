<script setup>
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted, watch } from 'vue'
import { use_calendar_store } from '@/stores/MonthSelector'
// 거래 내역을 상태로 관리하는 Pinia store
import { useTransactionStore } from '@/stores/TransactionStore'
import { useRouter } from 'vue-router'
// import

// 달력,AddListBtn import
import CalendarContent from '@/components/CalendarContent.vue'
import AddListBtn from '@/components/AddListBtn.vue'
import TransactionContent from '@/components/TransactionContent.vue'
const transactionStore = useTransactionStore()
const router = useRouter()
// 상단 import 부분에 추가
// setup 내에서 calendar 상태 불러오기
const calendar = use_calendar_store()
const { current_year, current_month } = storeToRefs(calendar)

// const calendar = use_calendar_store()
const { transactions } = storeToRefs(transactionStore)

// 필터링 컴포넌트 ( 카테고리 선택/메모 검색창 )
import FilterCategory from '@/components/FilterCategory.vue'
import SearchByMemo from '@/components/SearchByMemo.vue'

// 미리 정의된 카테고리 목록 (수입 / 지출), 카테고리 항목 '영어 - 한글' 매핑
import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
  CATEGORY_MAP,
} from '@/constants/categories'

// 내역 추가 버튼 누르면 나타나는 입력 팝업창

// Pinia store 불러오기
// const transactionStore = useTransactionStore()
// const transactionStore = useTransactionStore()
// const router = useRouter()

// 마운트될 때 거래 내역 불러오기
onMounted(() => {
  transactionStore.fetchTransactions()
})

const { visible_months } = storeToRefs(calendar)
const month_names = calendar.month_names

//달력 showCalendar, openCalendar
// const showCalendar = ref(false)

// const openCalendar = () => {
//   showCalendar.value = true
// }
const activeTab = ref('list') // 기본 탭: list

// const tabs = ['목록', '달력']

// 페이지 로드 시 거래 내역 불러오기
onMounted(() => {
  transactionStore.fetchTransactions()
})

// 필터 상태: 수입/지출 (기본: 모두 체크)
// const showIncome = ref(true)
// const showExpense = ref(true)

// 필터링된 거래 내역 목록 (수입/지출 체크 상태에 따라)
// const filteredTransactions = computed(() => {
//   return transactionStore.transactions.filter(record => {
//     if (record.type === '수입' && showIncome.value) return true
//     if (record.type === '지출' && showExpense.value) return true
//     return false
//   })
// })
// 상태변수 초기값 설정
// '수입' 체크박스 - 기본: 체크됨
const incomeChecked = ref(true)
// '지출' 체크박스 - 기본: 체크됨
const expenseChecked = ref(true)
// 카테고리 필터 - 기본: all(전체)
const categorySelected = ref('all')
// 메모 검색창 - 기본: ''
const memoInputted = ref('')

// '수입/지출' 체크박스 상태를 기준으로 거래 내역 필터링
// const filteredTransactions = computed(() => {
//   return transactionStore.transactions.filter(record => {
//     // type이 '수입' & '수입' 체크박스 체크 O
//     if (record.type === 'income' && incomeChecked.value) return true
//     // type이 '수출' & '수출' 체크박스 체크 O
//     if (record.type === 'expense' && expenseChecked.value) return true
//     // '수입/수출' 체크박스 모두 체크 X
//     return false
//   })
// })

const filteredByMonthTransactions = computed(() => {
  return transactionStore.transactions.filter(record => {
    const date = new Date(record.date)
    const recordYear = date.getFullYear()
    const recordMonth = date.getMonth()

    return (
      recordYear === current_year.value &&
      recordMonth === current_month.value &&
      ((record.type === 'income' && incomeChecked.value) ||
        (record.type === 'expense' && expenseChecked.value))
    )
  })
})

// 페이지 관련 변수
const currentPage = ref(1)
const pageSize = ref(10)

// 총 페이지 수 계산
const totalPages = computed(() => {
  return Math.ceil(filteredTransactions.value.length / pageSize.value) || 1
})

//#region 💰 금액 포맷 함수

/**
 * 금액에 부호(+, -)를 붙이고 천 단위 쉼표로 포맷된 문자열을 반환합니다.
 *
 * @param {string|number} value - 원본 금액 값 (문자열 / 숫자)
 * @param {string} type - 거래 유형 (income / expense)
 * @returns {string} 포맷된 금액 문자열 (예: +1,000 / -25,000)
 */
function prettyAmount(value, type) {
  // 문자열 -> 숫자로 변환
  const amt = parseFloat(value)
  // 예외처리 : 숫자 X -> 그대로 반환
  if (isNaN(amt)) return value
  // 천 단위로 쉼표(,) 붙이기
  const formatted = amt.toLocaleString()
  // 거래 유형에 따라 '+/-'부호 추가
  if (type === 'income') return `+${formatted}`
  if (type === 'expense') return `-${formatted}`
  // 예외처리 : 그 외의 type -> 부호 없이 반환
  return formatted
}
//#endregion

// '수입/지출' 체크박스 상태를 기준으로 거래내역 목록
const availableCategories = computed(() => {
  // '수입/지출' 체크박스 모두 체크 O
  if (incomeChecked.value && expenseChecked.value) {
    return [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES] // 모든 카테고리 반환
    // '수입'체크박스만 체크 O
  } else if (incomeChecked.value) {
    return [...INCOME_CATEGORIES]
    // '지출'체크박스만 체크 O
  } else if (expenseChecked.value) {
    return [...EXPENSE_CATEGORIES]
    // '수입/수출' 체크박스 모두 체크 X
  } else {
    return [] // 빈 배열 반환 (드롭다운 항목 X)
  }
})

// 카테고리 선택 이벤트
const CategoryChangeHandler = category => {
  // FilteredCategory.vue(자식 컴포넌트)에서 emit된 값
  categorySelected.value = category
}

// 메모 검색창 입력 이벤트
const MemoSearchHandler = text => {
  // 검색어 - 소문자로 변경, 공백 제거
  memoInputted.value = text.toLowerCase().trim()
}

// 필터링된 거래내역 (카테고리 + 메모)
const filteredList = computed(() => {
  return filteredByMonthTransactions.value.filter(item => {
    // 선택된 카테고리가 'all'이거나 선택된 카테고리와 카테고리가 같은 항목
    const categoryMatch =
      categorySelected.value === 'all' ||
      item.category === categorySelected.value

    // 메모 검색어가 비어있거나 메모 검색어가 메모에 들어있는 경우 - 검색어 모두 소문자로 변경
    const memoMatch =
      memoInputted.value === '' ||
      (item.memo && item.memo.toLowerCase().includes(memoInputted.value))

    // 두 조건을 모두 만족하는 항목 반환
    return categoryMatch && memoMatch
  })
})

// 드롭다운 리렌더링(초기화)하기 위한 key
const resetKey = ref(0)

// '수입/지출' 체크박스 변경 감지
watch([incomeChecked, expenseChecked], () => {
  // 선택된 카테고리 초기화
  categorySelected.value = 'all'
  // 드롭다운 초기화 - key값 변경 시 컴포넌트 리렌더링
  resetKey.value++
})

// 전체 선택 여부 (모든 항목의 selected 값이 'true'인지)
const isAllSelected = computed(() =>
  transactionStore.transactions.every(record => record.selected === true),
)

//#region 전체 선택/해제 이벤트
/**
 * 모든 거래내역의 체크박스를 일괄 선택/해제하는 함수
 * @param {Event} e - 체크박스 change 이벤트 객체
 */
function toggleSelectAll(e) {
  const checked = e.target.checked
  // 모든 거래 항목에 대해 selected 값을 변경
  transactionStore.transactions.forEach(record => {
    record.selected = checked
  })
}
//#endregion

//#region 개별 삭제 핸들러
/**
 * 특정 거래 항목을 삭제하는 함수
 * 사용자에게 삭제 확인 -> 해당 ID의 거래를 삭제하고 목록을 새로 불러옴
 *
 * @param {number|string} id - 삭제할 거래 항목의 ID
 */
async function deleteHandler(id) {
  if (confirm('정말 삭제하시겠습니까?')) {
    try {
      await transactionStore.deleteTransaction(id) // 개별 삭제 요청
      await transactionStore.fetchTransactions() // 최신 거래 내역으로 리렌더링
    } catch (error) {
      console.error('거래 삭제 오류:', error)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }
}
//#endregion

//#region 수정 버튼 클릭 핸들러
/**
 * 거래내역 수정 요청 처리 함수
 * 클릭된 거래내역의 ID를 라우터를 통해 수정 페이지로 전달하여 이동
 *
 * @param {Object} record - 수정할 거래 객체
 * @param {number|string} record.id - 거래의 고유 ID
 */
function editHandler(record) {
  console.log('수정할 거래 id:', record.id)
  router.push({
    name: 'TransactionEdit', // 이동할 라우터 이름
    params: { id: record.id }, // 수정할 거래 ID 전달
  })
}
//#endregion

//#region 선택 삭제 이벤트
/**
 * 체크된 항목만 삭제하는 함수
 * 선택된 거래내역의 id를 기준으로 삭제 진행
 */
function selectedDeleteHandler() {
  const selectedIds = transactionStore.transactions
    .filter(record => record.selected)
    .map(record => record.id)

  if (selectedIds.length === 0) {
    alert('삭제할 항목이 없습니다!')
    return
  }

  if (confirm('선택한 항목을 정말 삭제하시겠습니까?')) {
    selectedIds.forEach(id => {
      transactionStore.deleteTransaction(id)
    })
  }
}

//#region 전체 삭제 이벤트
/**
 * 모든 거래 내역을 삭제하는 함수
 * 거래 항목이 없을 경우 예외 처리
 */
function allDeleteHandler() {
  if (transactionStore.transactions.length === 0) {
    alert('삭제할 항목이 없습니다!')
    return
  }

  if (confirm('정말 모든 항목을 삭제하시겠습니까?')) {
    transactionStore.transactions.forEach(record => {
      transactionStore.deleteTransaction(record.id)
    })
  }
}
//#endregion

//#region 행을 클릭하면 체크되는 이벤트
/**
 * 만약 클릭한 요소가 이미 수정/삭제 아이콘 등 click.stop 처리된 요소가 아니라면,
 * 해당 행의 체크 상태를 토글
 */
function toggleRow(record, event) {
  record.selected = !record.selected
}
//#endregion
</script>
<!-- 탭메뉴 -->
<template>
  <!-- 월 이동 컴포넌트 -->

  <div class="TransactionPage">
    <div class="calendar_carousel">
      <button type="button" class="arrow" @click="calendar.go_to_prev_month">
        &lt;
      </button>

      <div class="month_slider">
        <div
          v-for="(month, index) in visible_months"
          :key="index"
          class="month_item"
        >
          <p :class="{ active: index === 1, faded: index !== 1 }">
            {{ month.year }} {{ month_names[month.month] }}
          </p>
        </div>
      </div>

      <button type="button" class="arrow" @click="calendar.go_to_next_month">
        &gt;
      </button>
    </div>
    <div class="container-fluid px-4 py-4">
      <!-- 필터 영역 -->
      <div
        v-for="(month, index) in visible_months"
        :key="index"
        class="month_item"
      >
        <p :class="{ active: index === 1, faded: index !== 1 }">
          {{ month.year }} {{ month_names[month.month] }}
        </p>
      </div>
    </div>
    <!-- 선택/전체 삭제 버튼 -->
    <div class="delete_btn">
      <button @click="selectedDeleteHandler">선택 삭제</button>
      <button @click="allDeleteHandler">전체 삭제</button>
    </div>

    <!-- 카테고리 필터 컴포넌트 (드롭다운) -->
    <!-- props - 'FilterCategory.vue'로 '카테고리/resetKey' 전달 -->
    <FilterCategory
      :categories="availableCategories"
      :resetKey="resetKey"
      @categorySelected="CategoryChangeHandler"
    />
  </div>
  <div class="container">
    <div>
      <!-- Bootstrap 탭 메뉴 -->
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'list' }"
            @click="activeTab = 'list'"
          >
            목록
          </button>
        </li>
        <li class="nav-item">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'calendar' }"
            @click="activeTab = 'calendar'"
          >
            달력
          </button>
        </li>
      </ul>

      <!-- 탭 콘텐츠 -->
      <div class="tab-content mt-3">
        <div v-if="activeTab === 'list'">
          <!-- 목록 보기 -->
          <!-- <TransactionContent :transactions="store.transactions" />/ -->
          <!-- <TransactionContent :transactions="transactionStore.transactions" /> -->
          <TransactionContent />
        </div>
        <div v-else-if="activeTab === 'calendar'">
          <!-- 달력 보기 -->
          <CalendarContent />
        </div>
      </div>

      <!-- '수입/지출' 필터링된 거래내역 -->
      <div
        v-if="filteredList.length > 0"
        class="table-responsive rounded shadow-sm bg-white px-3 w-100"
        style="max-height: 400px; overflow-y: auto"
      >
        <table class="table table-hover mb-0 text-center align-middle">
          <thead class="table-light">
            <tr>
              <th scope="col" style="width: 40px">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  @change="toggleSelectAll($event)"
                />
              </th>
              <th scope="col" style="width: 160px">날짜</th>
              <th scope="col" style="width: 150px">카테고리</th>
              <!-- 'width: auto': 남은 공간 자동으로 차지 -->
              <th scope="col" style="width: auto">메모</th>
              <th scope="col" style="width: 150px">금액</th>
              <th scope="col" style="width: 60px">수정</th>
              <th scope="col" style="width: 60px">삭제</th>
            </tr>
          </thead>
          <tbody>
            <!-- 카테고리/메모 필터링된 거래내역 -->
            <tr
              v-for="filtered in filteredList"
              :key="filtered.id"
              @click="toggleRow(filtered, $event)"
              style="cursor: pointer"
            >
              <!-- 체크박스 - 버블링 방지 -->
              <td>
                <input
                  type="checkbox"
                  v-model="filtered.selected"
                  @click.stop
                />
              </td>
              <td>{{ filtered.date }}</td>
              <td>
                {{ CATEGORY_MAP[filtered.category] || filtered.category }}
              </td>
              <!-- text-truncate: 길어지면 말줄임표(...) 처리 (너비제한 필요) -->
              <td class="text-start text-truncate" style="max-width: 300px">
                {{ filtered.memo }}
              </td>
              <td class="text-end">
                {{ prettyAmount(filtered.amount, filtered.type) }} 원
              </td>
              <!-- 수정 아이콘 - 버블링 방지 -->
              <td>
                <i
                  class="text-success d-block mx-auto icon-hover"
                  @click.stop="editHandler(filtered)"
                  style="cursor: pointer"
                >
                  ✏️
                </i>
              </td>
              <!-- 삭제 아이콘: 클릭 시 행 토글 방지를 위해 click.stop 사용 -->
              <td>
                <i
                  class="text-danger d-block mx-auto icon-hover"
                  @click.stop="deleteHandler(filtered.id)"
                  style="cursor: pointer"
                  >🗑️</i
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 거래내역 없을 경우 메시지 출력 -->
      <div
        v-else
        id="emptyTransaction"
        class="text-center text-muted mt-4 fs-5"
        style="
          min-height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        표시할 내역이 없습니다.
      </div>
    </div>
  </div>
  <!-- 추가 버튼 -->
  <AddListBtn />
</template>

<style scoped>
/* 월 이동 컴포넌트 */
.container {
  background-color: var(--color-point-3);
  border-radius: 30px;
  width: 98%;
  min-width: 768px;
  height: 630px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.calendar_carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.month_slider {
  display: flex;
  width: 500px;
  overflow: hidden;
  justify-content: space-between;
}

.month_item {
  width: 100px;
  text-align: center;
  font-size: 1.2rem;
  opacity: 0.6;
  transform: scale(0.9);
  transition: all 0.5s ease;
}

.month_item p {
  font-size: 2.5rem;
}

.faded {
  opacity: 0.4;
}
.active {
  font-weight: bold;
}

.month_item.active {
  font-size: 1.5rem;
  font-weight: bold;
  opacity: 1;
  transform: scale(1.1);
}

.arrow {
  font-size: 2rem;
  cursor: pointer;
  background: none;
  border: none;
  color: #4caf50;
  transition: transform 0.2s ease;
}
.arrow:hover {
  transform: scale(1.2);
}

/* 전체 컨테이너 */
/* .ledger-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: sans-serif;
  background-color: #fff;
} */

/* 상단 연/월 네비게이션 */
/* .ledger-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  gap: 40px;
  background-color: #fff;
} */
/* .month-nav {
  font-size: 1.1rem;
  color: #888;
  cursor: pointer;
} */
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

/* 탭메뉴 */
.nav-tabs .nav-link {
  cursor: pointer;
}
/* '수입/지출' 체크박스  */
.align-items-center {
  border-radius: 15px;
}

/* --color-font-main: #3f3e3c;
  --color-point-1: #328e6e;
  --color-point-2: #67ae6e;
  --color-point-3: #99bc85;
  --color-point-4: #b7ccb4;
  --color-point-5: #d3ded9;
  --color-input-box: #dbdbdb;
  --color-brown-dark: #706d54;
  --color-brown-light: #c9b194;
  --color-brown-very-light: #ededed;
  --color-red-100: #f93949;
  --color-red-light: rgba(249, 57, 73, 0.2);
  --color-green-light: rgba(42, 125, 92, 0.2); */
/* '수입' 체크박스 */
#incomeCheck {
  background-color: var(--color-green-light);
  border-color: var(--color-point-1);
}

/* '수입' 체크박스 선택 */
#incomeCheck:checked {
  background-color: var(--color-point-1);
  border-color: var(--color-point-1);
}

/* '지출' 체크박스 */
#expenseCheck {
  background-color: var(--color-red-light);
  border-color: var(--color-red-100);
}

/* '지출' 체크박스 선택 */
#expenseCheck:checked {
  background-color: var(--color-red-100);
  border-color: var(--color-red-100);
}

/* 거래내역 없을 때 텍스트 */
#emptyTransaction {
  text-align: center;
  margin: 20px;
}

.delete_btn {
  background-color: aqua;
  display: flex;
  flex-direction: column;
}

.icon-hover:hover {
  transform: scale(1.2);
  transition: transform 0.2s ease;
}
</style>
