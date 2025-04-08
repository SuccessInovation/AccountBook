<template>
  <div class="HomePage">
    <h1>홈페이지</h1>

    <div class="calendar-header">
      <button @click="goToPrevMonth" class="arrow">&lt;</button>
      <div class="date-info">
        <span class="year">{{ currentYear }}</span>
        <br />
        <span class="month">{{ currentMonth + 1 }}월</span>
      </div>
      <button @click="goToNextMonth" class="arrow">&gt;</button>
    </div>
  </div>
</template>

<script setup>
//npm install @vuepic/vue-datepicker datepicker 설치
import { ref } from 'vue'

// 현재 날짜 기준으로 시작
const today = new Date()
const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth()) // 0부터 시작 (0=1월)

// 이전 달로 이동
function goToPrevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

// 다음 달로 이동
function goToNextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: 'Pretendard', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1rem;
}

.arrow {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #4caf50; /* 초록 계열 */
  transition: transform 0.2s ease;
}
.arrow:hover {
  transform: scale(1.2);
}

.date-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.year {
  font-size: 1.2rem;
  color: #555;
}
.month {
  font-size: 2rem;
  color: #2e7d32;
}
</style>
