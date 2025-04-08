<template>
  <div class="ExportExcelPage">
    <ExcelFilter @search="handleSearch" />
    <ExcelList v-if="isSearched" />
  </div>
</template>

<script setup>
import ExcelFilter from '@/components/ExcelFilter.vue';
import ExcelList from '@/components/ExcelList.vue';
import { ref } from 'vue';

const isSearched = ref(false); // ✅ 조회 상태 추가

const handleSearch = () => {
  isSearched.value = true; // ✅ 조회 버튼 누르면 true로 바뀜
};
</script>

<style>
.ExportExcelPage {
  border: 1px solid lightblue;
}
</style>
