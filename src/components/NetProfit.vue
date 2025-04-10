<template>
  <div>
    <h3>순이익 요약</h3>
    <!-- <p>순이익: {{ netProfit?.toLocaleString?.() ?? '데이터 없음' }} 원</p> -->
    <p>
      순이익:
      <span :style="{ color: netProfit >= 0 ? 'green' : 'red' }">
        {{ netProfit?.toLocaleString?.() ?? '데이터 없음' }} 원
      </span>
    </p>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  netProfit: {
    type: Number,
    required: true,
  },
})

const netProfit = computed(() => props.netProfit)
</script>

<style scoped>
h3 {
  margin-bottom: 1rem;
}
p {
  margin: 0.5rem 0;
}
</style>
