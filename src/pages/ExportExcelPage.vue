<template>
  <div class="ExportExcelPage">
    <div class="container">
      <ExcelFilter class="excel_filter" @search="handleSearch" />
      <ExcelList class="excel_list" v-if="isSearched" />
    </div>
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
  position: absolute;
  background-color: black;
  height: calc(100% - (120px + 80px)); /* 헤더+푸터의 높이만큼 뺌 */
  width: calc(100% - 250px); /* 사이드바의 너비만큼 뺌 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  background-color: grey;
  width: 1500px;
  height: 630px;
}
</style>
