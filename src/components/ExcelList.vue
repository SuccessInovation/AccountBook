<template>
  <div class="box">
    <h2>엑셀 내보내기용 데이터</h2>
    <div v-if="store.loading">불러오는 중...</div>
    <div v-else-if="store.error">에러: {{ store.error }}</div>
    <ul v-else>
      <li v-for="item in store.filteredRecords" :key="item.id">
        {{ item.date }} | {{ item.category }} | {{ item.amount }}원
      </li>
    </ul>
    <button class="export_btn">내보내기</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { statisticsStore } from '@/stores/statisticsStore'

const store = statisticsStore()

onMounted(() => {
  store.fetchRecords()
  const filtered = store.fetchRecordsByPeriod()
  console.log('조회 결과:', filtered)
})
</script>

<style scoped>
.box {
  width: 100%;
  border: 1px solid lightgray;
  padding: 1rem;
}
.export_btn {
  background-color: purple;
  color: white;
}
</style>
