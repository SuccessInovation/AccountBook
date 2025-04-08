<script setup>
import { use_calendar_store } from '@/stores/MonthSelector'

const calendar = use_calendar_store()
</script>

<template>
  <div class="calendar_carousel">
    <!-- 왼쪽 화살표: 이전 달로 이동 -->
    <button class="arrow" @click="calendar.go_to_prev_month">&lt;</button>

    <!-- 월을 보여주는 영역 (이전, 현재, 다음) -->
    <div class="month_slider">
      <!-- 현재를 기준으로 3개의 월 정보 렌더링 -->
      <div
        v-for="(month, index) in visible_months"
        :key="index"
        class="month_item"
      >
        <p :class="{ active: index === 1, faded: index !== 1 }">
          {{ month.year }} {{ month_names[month.month] }}
        </p>
      </div>
    </div>

    <!-- 오른쪽 화살표: 다음 달로 이동 -->
    <button class="arrow" @click="calendar.go_to_next_month">&gt;</button>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

/* 전체 레이아웃: 화살표 + 중앙 월 표시 */
.calendar_carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

/* 월을 보여주는 가운데 영역 (3개의 월 정보가 가로 정렬됨) */
.month_slider {
  display: flex;
  width: 500px;
  overflow: hidden;
  justify-content: space-between;
}

/* 각 월 항목 기본 스타일: 축소 + 투명 */
.month_item {
  width: 100px;
  text-align: center;
  font-size: 1.2rem;
  opacity: 0.6; /* 반투명 처리 */
  transform: scale(0.9); /* 크기 축소 */
  transition: all 0.5s ease; /* 부드러운 전환 */
}

.month_item p {
  font-size: 2.5rem;
}

.faded {
  opacity: 0.4;
}
.active {
  font-weight: bold;
}

/* 가운데 항목에 강조 스타일 적용 */
.month_item.active {
  font-size: 1.5rem;
  font-weight: bold;
  opacity: 1; /* 완전 불투명 */
  transform: scale(1.1); /* 강조 확대 */
}

/* 좌우 화살표 버튼 스타일 */
.arrow {
  font-size: 2rem;
  cursor: pointer;
  background: none;
  border: none;
  color: #4caf50;
  transition: transform 0.2s ease;
}
.arrow:hover {
  transform: scale(1.2); /* 마우스 호버 시 확대 효과 */
}
</style>
