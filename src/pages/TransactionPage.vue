<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// 거래 내역을 상태로 관리하는 Pinia store
import { useTransactionStore } from '@/stores/TransactionStore'

// 필터링 컴포넌트 (카테고리 선택 / 메모 검색창)
import FilterCategory from '@/components/FilterCategory.vue'
import SearchByMemo from '@/components/SearchByMemo.vue'

// 미리 정의된 카테고리 목록 (수입 / 지출), 카테고리 항목 '영어 - 한글' 매핑
import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
  CATEGORY_MAP,
} from '@/constants/categories'

// Pinia store 불러오기
const transactionStore = useTransactionStore()

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
</script>

<template>
  <div class="TransactionPage">
    <div class="container-fluid px-4 py-4" style="min-height: 100vh">
      <div
        class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2"
      >
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

        <!-- 거래내역이 없을 경우 메시지 출력 -->
        <div v-if="filteredList.length === 0" id="emptyTransaction">
          표시할 내역이 없습니다.
        </div>

        <!-- '수입/지출' 필터링된 거래내역 -->
        <div
          v-else
          class="table-responsive rounded shadow-sm bg-white px-3 w-100"
          style="max-height: 400px; overflow-y: auto"
        >
          <table class="table table-hover mb-0 text-center align-middle">
            <thead class="table-light">
              <tr>
                <th scope="col" style="width: 40px">
                  <input type="checkbox" />
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
              <!-- 카테고리 필터링된 거래내역 -->
              <tr v-for="filtered in filteredList" :key="filtered.id">
                <td><input type="checkbox" /></td>
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
                <td>
                  <i
                    class="text-success d-block mx-auto"
                    style="cursor: pointer"
                    >✏️</i
                  >
                </td>
                <td>
                  <i class="text-danger d-block mx-auto" style="cursor: pointer"
                    >🗑️</i
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
</style>
