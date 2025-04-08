<template>
  <div class="box">
    <ul>
      <li v-for="item in store.filteredRecords" :key="item.id">
        {{ item.date }} | {{ item.category }} | {{ item.amount }}원
      </li>
    </ul>
  </div>
</template>

<script setup>
import { statisticsStore } from '@/stores/statisticsStore';
const store = statisticsStore();
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
