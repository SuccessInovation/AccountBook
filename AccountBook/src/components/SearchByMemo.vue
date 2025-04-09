<script setup>
import { ref, defineEmits } from 'vue'

const categories = ['전체', '식비']

// 선택된 카테고리 전달하기 위해 emit 정의
const emit = defineEmits(['categorySelected'])

// 기본 (전체 내역 보여줌) - 필터 적용 X
const selectedCategory = ref('카테고리')

// 카테고리 선택 시
const selectHandler = () => {
  emit('categorySelected', selectedCategory.value)
}
</script>

<template>
  <div class="filter_category">
    <select v-model="selectedCategory" @change="selectHandler">
      <option value="">카테고리 선택</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.filter_category select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 14px;
  border-radius: 4px;
  min-width: 180px;
}
</style>
