<<<<<<< HEAD
<script setup>

</script>

<template>
  <div class="ExportExcelPage">엑셀 내보내기 페이지</div>
</template>

<style scoped>

</style>
=======
<template>
  <div class="ExportExcelPage">
    <div class="container">
      <!-- 상단 수평 정렬 -->
      <div class="top-bar">
        <ExcelFilter class="excel_filter" @search="handleSearch" />
        <button
          id="btn_export"
          @click="downloadExcel(store.filteredTransaction)"
        >
          엑셀로 내보내기
        </button>
      </div>
      <!-- 리스트 -->
      <ExcelList class="excel_list" />
    </div>
  </div>
</template>

<script setup>
import ExcelFilter from '@/components/ExcelFilter.vue'
import ExcelList from '@/components/ExcelList.vue'
import * as XLSX from 'xlsx'
import { ref } from 'vue'
import { statisticsStore } from '@/stores/statisticsStore'

const store = statisticsStore()
const isSearched = ref(false)

const handleSearch = () => {
  isSearched.value = true
}

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
.ExportExcelPage {
  position: absolute;
  height: calc(100% - (120px + 80px)); /* 헤더+푸터의 높이만큼 뺌 */
  width: calc(100% - 250px); /* 사이드바의 너비만큼 뺌 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  background-color: var(--color-point-3);
  border-radius: 30px;
  width: 98%;
  min-width: 768px;
  height: 630px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.top-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
}
#btn_export {
  background-color: var(--color-point-1);
  color: white;
  font-weight: 500;
  font-size: 15px;
  width: 130px;
  height: 35px;
  border-radius: 10px;
  position: absolute;
  bottom: 5px;
  right: 2.5%;
}
@media (max-width: 991px) {
  .ExportExcelPage {
    left: 100px; /* 메뉴 너비 확보 */
  }
}
</style>
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
