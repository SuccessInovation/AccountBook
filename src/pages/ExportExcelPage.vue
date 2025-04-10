<template>
  <div class="ExportExcelPage">
    <ExcelFilter class="excel_filter" @search="handleSearch" />
    <ExcelList class="excel_list" v-if="isSearched" />
  </div>
</template>

<script setup>
import ExcelFilter from '@/components/ExcelFilter.vue'
import ExcelList from '@/components/ExcelList.vue'
import { ref } from 'vue'

const isSearched = ref(false)

const handleSearch = () => {
  isSearched.value = true
}
</script>

<style scoped>
.ExportExcelPage {
  display: flex;
  justify-content: center;
}

.excel_filter {
  width: 1024px;
  margin: 10rem auto;
  border: 2rem solid var(--point-3-color);
  background-color: var(--point-3-color);
}
.excel_list {
}
</style>
