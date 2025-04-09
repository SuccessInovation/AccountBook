<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// 수입/지출 체크박스
import { useTransactionStore } from '@/stores/TransactionStore'

// 필터/검색
import FilterCategory from '@/components/FilterCategory.vue'
import SearchByMemo from '@/components/SearchByMemo.vue'

import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
  CATEGORY_MAP,
} from '@/constants/categories'

const TransactionStore = useTransactionStore()

// 마운트될 때 거래 내역 불러오기
onMounted(() => {
  TransactionStore.fetchTransactions()
})

// 초기값 설정
// '수입' 체크박스
const incomeChecked = ref(true)
// '지출' 체크박스
const expenseChecked = ref(true)
// 카테고리 필터
const categorySelected = ref('all')
// 메모 검색창
const memoInputted = ref('')

// 수입/지출 체크박스 -> 거래 내역 목록
const filteredTransactions = computed(() => {
  return TransactionStore.transactions.filter(record => {
    if (record.type === 'income' && incomeChecked.value) {
      return true
    }
    if (record.type === 'expense' && expenseChecked.value) return true
    return false
  })
})

// 체크박스 -> 카테고리 목록
const availableCategories = computed(() => {
  // '수입 & 지출' 모두 선택 시
  if (incomeChecked.value && expenseChecked.value) {
    // 모든 카테고리 반환
    return [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]
    // '수입'만 선택 시
  } else if (incomeChecked.value) {
    return [...INCOME_CATEGORIES]
    // '지출'만 선택 시
  } else if (expenseChecked.value) {
    return [...EXPENSE_CATEGORIES]
    // 아무것도 선택 안 할 시
  } else {
    return [] // 빈 배열 출력
  }
})

// 카테고리 선택 핸들러
const CategoryChangeHandler = category => {
  // FilteredCategory.vuse에서 emit된 값 받아서 저장
  categorySelected.value = category
}

// 검색창 입력 핸들러
const MemoSearchHandler = text => {
  memoInputted.value = text.toLowerCase().trim()
}

// 카테고리 필터링된 내역 저장 : 카테고리 + 메모
const filteredList = computed(() => {
  return filteredTransactions.value.filter(item => {
    // 카테고리가 일치하는 항목
    const categoryMatch =
      categorySelected.value === 'all' ||
      item.category === categorySelected.value

    // 메모 검색
    const memoMatch =
      memoInputted.value === '' ||
      item.description.toLowerCase().includes(memoInputted.value)
    return categoryMatch && memoMatch
  })
})

// 체크박스 상태 변경 -> 드롭다운 초기화
const resetKey = ref(0)
// 체크박스 감시
watch([incomeChecked, expenseChecked], () => {
  // 'all'로 초기화
  categorySelected.value = 'all'
  // 'resetKey'변경 -> 드롭다운 초기화
  resetKey.value++
})
</script>

<template>
  <div class="TransactionPage">
    <!-- 수입/지출 필터 체크박스 -->
    <label class="checkbox_income">
      <input type="checkbox" v-model="incomeChecked" />
      <span>수입</span>
    </label>
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
        - {{ filtered.description }} - {{ filtered.amount }}
      </li>
    </ul>
    <p v-if="filteredList.length === 0">표시할 내역이 없습니다.</p>
  </div>
</template>

<style scoped></style>
