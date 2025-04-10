<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// 거래 내역을 상태로 관리하는 Pinia store
import { useTransactionStore } from '@/stores/TransactionStore'
import { useRouter } from 'vue-router'

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
const transactionStore = useTransactionStore()
const router = useRouter()

// 마운트될 때 거래 내역 불러오기
onMounted(() => {
  transactionStore.fetchTransactions()
})

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
const filteredTransactions = computed(() => {
  return transactionStore.transactions.filter(record => {
    // type이 '수입' & '수입' 체크박스 체크 O
    if (record.type === 'income' && incomeChecked.value) return true
    // type이 '수출' & '수출' 체크박스 체크 O
    if (record.type === 'expense' && expenseChecked.value) return true
    // '수입/수출' 체크박스 모두 체크 X
    return false
  })
})

//#region 금액 포맷 함수
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
  return filteredTransactions.value.filter(item => {
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
</script>

<template>
  <div class="TransactionPage">
    <div class="container-fluid px-4 py-4">
      <!-- 필터 영역 -->
      <div
        class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2"
      >
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

        <!-- 메모 검색창 컴포넌트 -->
        <SearchByMemo @memoInputted="MemoSearchHandler" />

        <!-- 수입/지출 필터 - 하나의 하얀 박스 안에 체크박스 2개 배치 -->
        <div class="d-flex align-items-center bg-white px-3 py-2 gap-3">
          <!-- 수입 체크박스 -->
          <div class="form-check form-check-inline m-0">
            <input
              class="form-check-input me-1"
              type="checkbox"
              id="incomeCheck"
              v-model="incomeChecked"
            />
            <label class="form-check-label fw-semibold" for="incomeCheck">
              수입
            </label>
          </div>
          <!-- 지출 체크박스 -->
          <div class="form-check form-check-inline m-0">
            <input
              class="form-check-input me-1"
              type="checkbox"
              id="expenseCheck"
              v-model="expenseChecked"
            />
            <label class="form-check-label fw-semibold" for="expenseCheck">
              지출
            </label>
          </div>
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
                  @click.stop="handleDelete(filtered.id)"
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
</template>

<style scoped>
/* '수입/지출' 체크박스  */
.align-items-center {
  border-radius: 15px;
}

/* '수입' 체크박스 */
#incomeCheck {
  background-color: var(--light-green);
  border-color: var(--point-1-color);
}

/* '수입' 체크박스 선택 */
#incomeCheck:checked {
  background-color: var(--point-1-color);
  border-color: var(--point-1-color);
}

/* '지출' 체크박스 */
#expenseCheck {
  background-color: var(--light-red);
  border-color: var(--red-100);
}

/* '지출' 체크박스 선택 */
#expenseCheck:checked {
  background-color: var(--red-100);
  border-color: var(--red-100);
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

icon-hover:hover {
  transform: scale(1.2);
  transition: transform 0.2s ease;
}
</style>
