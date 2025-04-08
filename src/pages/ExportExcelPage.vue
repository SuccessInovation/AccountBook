<template>
  <div class="ExportExcelPage">
    <ExcelFilter />
    <ExcelList />
  </div>
</template>

<script setup>
import ExcelFilter from '@/components/ExcelFilter.vue'
import ExcelList from '@/components/ExcelList.vue'
import { onMounted } from 'vue'
import { statisticsStore } from '@/stores/statisticsStore'

const store = statisticsStore()

onMounted(() => {
  store.fetchRecordsByPeriod()
})
</script>

<style>
.ExportExcelPage {
  border: 1px solid lightblue;
}
</style>
