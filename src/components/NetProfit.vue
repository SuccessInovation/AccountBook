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
    <!-- 이미지 출력 -->
    <img :src="profitImage" alt="수입 대비 지출 상태" style="width: 200px" />
    <!-- 설명 문구 출력 -->
    <p class="profit-message">{{ profitMessage }}</p>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  netProfit: {
    type: Number,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  expense: {
    type: Number,
    required: true,
  },
})

const netProfit = computed(() => props.netProfit)

// ✅ 수입 대비 지출 비율 계산
const spendingRate = computed(() => {
  if (!props.income) return 0 // 수입이 없으면 0
  return (props.expense / props.income) * 100
})

const profitImage = computed(() => {
  const rate = spendingRate.value

  if (rate < 40) {
    return new URL('@/img/cabbage/logo1.png', import.meta.url).href // 초록 배추
  } else if (rate < 80) {
    return new URL('@/img/cabbage/logo4.jpg', import.meta.url).href // 초록 배추 다음 살짝 노랑
  } else if (rate < 100) {
    return new URL('@/img/cabbage/logo3.png', import.meta.url).href // 좀 빨개진 배추
  } else {
    return new URL('@/img/cabbage/logo2.png', import.meta.url).href // 빨간 배추
  }
})

const profitMessage = computed(() => {
  const rate = spendingRate.value

  if (rate < 40) {
    return '최고예요! 지출을 잘 관리하고 있어요 🎉'
  } else if (rate < 80) {
    return '잘하고 있어요! 화이팅 👍'
  } else if (rate < 100) {
    return '지출이 많아요! 관리가 필요해요 🔎'
  } else {
    return '수입에 비해 지출이 너무 많아요 🚨'
  }
})
</script>

<style scoped>
h3 {
  margin-bottom: 1rem;
}
p {
  margin: 0.5rem 0;
}
</style>
