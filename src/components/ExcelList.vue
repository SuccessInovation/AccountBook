<template>
  <div class="box">
    <button id="btn_export" @click="downloadExcel(store.filteredTransaction)">
      엑셀로 내보내기
    </button>
    <ul>
      <!-- 양식에 맞게 수정 예정 -->
      <li v-for="item in store.filteredTransaction" :key="item.id">
        {{ item.date }} | {{ item.category }} | {{ item.amount }}원
      </li>
    </ul>
  </div>
</template>

<script setup>
import { statisticsStore } from '@/stores/statisticsStore'
import * as XLSX from 'xlsx'

const store = statisticsStore()

const downloadExcel = data => {
  if (!data || data.length === 0) {
    alert('내보낼 데이터가 없습니다!')
    return
  }

  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, '가계부')
  XLSX.writeFile(workbook, 'transactionList.xlsx')
}
</script>

<style scoped>
.box {
  background-color: white;
  border: 1px solid black;
  height: 500px;
  width: 100%;
}
#btn_export {
  display: block;
  margin-bottom: 10px; /* 박스와 간격 */
  background-color: var(--color-point-1);
  color: white;
  font-weight: 500;
  font-size: 15px;
  width: 130px;
  height: 35px;
  border-radius: 10px;
}
</style>
