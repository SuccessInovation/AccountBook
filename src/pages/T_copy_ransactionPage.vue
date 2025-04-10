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
const TransactionStore = useTransactionStore()

// 마운트될 때 거래 내역 불러오기
onMounted(() => {
  TransactionStore.fetchTransactions()
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
  return TransactionStore.transactions.filter(record => {
    // type이 '수입' & '수입' 체크박스 체크 O
    if (record.type === 'income' && incomeChecked.value) {
      return true
    }
    // type이 '수출' & '수출' 체크박스 체크 O
    if (record.type === 'expense' && expenseChecked.value) {
      return true
    }
    // '수입/수출' 체크박스 모두 체크 X
    return false
  })
})

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
      item.memo.toLowerCase().includes(memoInputted.value)

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
    <!-- '수입/지출' 체크박스 -->

    <!-- '수입' 체크박스 -->
    <input type="checkbox" v-model="incomeChecked" />
    <label class="checkbox_income"> 수입</label>
    <label class="checkbox_expense">
      <input type="checkbox" v-model="expenseChecked" />
      <span>지출</span>
    </label>

    <!-- 카테고리 필터 -->
    <FilterCategory
      :categories="availableCategories"
      :resetKey="resetKey"
      @categorySelected="CategoryChangeHandler"
    />
    <!-- 메모 검색 -->
    <SearchByMemo @memoInputted="MemoSearchHandler" />

    <!-- 필터링된 내역 출력 -->
    <ul class="filtered_list">
      <!-- 수정 필요 -->
      <li v-for="filtered in filteredList" :key="filtered.id">
        <!-- 카테고리 원본: {{ filtered.category }} 매핑된 한글:
        {{ CATEGORY_MAP[filtered.category] || filtered.category }} -->

        {{ filtered.date }} -
        {{ CATEGORY_MAP[filtered.category] || filtered.category }}
        - {{ filtered.memo }} - {{ filtered.amount }}
      </li>
    </ul>
    <p v-if="filteredList.length === 0">표시할 내역이 없습니다.</p>
  </div>
</template>

<style scoped></style>
