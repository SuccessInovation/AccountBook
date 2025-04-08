<template>
  <div class="box">
    <ul>
      <li v-for="item in store.filteredRecords" :key="item.id">
        {{ item.date }} | {{ item.category }} | {{ item.amount }}원
      </li>
    </ul>
    <button @click="downloadExcel(store.filteredRecords)">내보내기</button>
  </div>
</template>

<script setup>
import { statisticsStore } from '@/stores/statisticsStore';
import * as XLSX from 'xlsx';

const store = statisticsStore();

const downloadExcel = (data) => {
  if (!data || data.length === 0) {
    alert('내보낼 데이터가 없습니다!');
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '조회내역');
  XLSX.writeFile(workbook, 'transactionList.xlsx');
};
</script>

<style scoped>
.box {
  width: 100%;
  border: 1px solid lightgray;
  padding: 1rem;
}
</style>
