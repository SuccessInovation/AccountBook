<template>
  <div class="ExportExcelPage">
    <ExcelFilter @search="handleSearch" />
    <ExcelList v-if="isSearched" />
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
  background-color: var(--point-3-color);
}
</style>
