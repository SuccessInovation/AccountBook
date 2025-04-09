<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

import FilterCategory from '@/components/filter_search/FilterCategory.vue'
import SearchByMemo from '@/components/filter_search/SearchByMemo.vue'

import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
  CATEGORY_MAP,
} from '@/constants/categories'

// 초기값 설정 (카테고리 필터 선택 전 상태)
const categorySelected = ref('all')
// 초기값 설정 (검색창 입력 전 상태)
const memoInputted = ref('')
// 거래내역 담아올 배열 정의
const transactions = ref([])

// db.json에서 거래내역 불러오기
const fetchTransactions = async () => {
  const res = await axios.get('http://localhost:3000/transactions')
  transactions.value = res.data
}

onMounted(fetchTransactions)

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
  return transactions.value.filter(item => {
    const categoryMatch =
      categorySelected.value === 'all' ||
      item.category === categorySelected.value

    const memoMatch =
      memoInputted.value === '' ||
      (item.description &&
        item.description.toLowerCase().includes(memoInputted.value))
    return categoryMatch && memoMatch
  })
})
</script>

<template>
  <div class="TransactionPage">
    <!-- 카테고리 필터 -->
    <FilterCategory
      :categories="EXPENSE_CATEGORIES"
      @categorySelected="CategoryChangeHandler"
    />
    {/* 메모 검색 */}
    <SearchByMemo @memoInputted="MemoSearchHandler" />

    <!-- 필터링된 내역 출력 -->
    <ul class="filtered_list">
      <!-- 수정 필요 -->
      <li v-for="filtered in filteredList" :key="filtered.id">
        {{ console.log('🍰 category:', filtered.category) }}
        {{ filtered.date }} -
        {{
          CATEGORY_MAP[filtered.category?.toLowerCase()] || filtered.category
        }}
        - {{ filtered.description }} - {{ filtered.amount }}
      </li>
    </ul>
    <p v-if="filteredList.length === 0">표시할 내역이 없습니다.</p>
  </div>
</template>

<style scoped></style>
