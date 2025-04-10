<template>
  <div class="wrapper">
    <button id="btn_export" @click="downloadExcel(store.filteredTransaction)">
      엑셀로 내보내기
    </button>
    <div class="box">
      <table id="transaction-table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>카테고리</th>
            <th>내용</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.filteredTransaction" :key="item.id">
            <td>{{ item.date }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.memo || '-' }}</td>
            <!-- 내용 없으면 '-' 표시 -->
            <td>{{ item.amount }}원</td>
          </tr>
        </tbody>
      </table>
    </div>
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
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* 버튼을 오른쪽 정렬 */
  gap: 5px; /* 버튼과 박스 사이 간격 */
}
#btn_export {
  background-color: var(--color-point-1);
  color: white;
  font-weight: 500;
  font-size: 15px;
  width: 130px;
  height: 35px;
  border-radius: 10px;
  position: relative;
}

.box {
  background-color: lightpink;
  border: 1px solid black;
  height: 500px;
  width: 100%;
  display: block;
}
</style>
