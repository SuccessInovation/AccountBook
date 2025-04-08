<script setup>
import { ref, computed } from 'vue'

// 월 이름을 숫자(index)로부터 가져오기 위한 배열
// index 0 → January, index 11 → December
const month_names = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

//  현재 날짜 기준으로 초기값 설정
const base_date = new Date()

//  current_year: 현재 보고 있는 연도를 저장하는 반응형 변수
//    - ref를 사용하여 반응형으로 상태를 추적함
const current_year = ref(base_date.getFullYear())

//  current_month: 현재 보고 있는 월 (0~11)
//    - base_date에서 getMonth()는 0부터 시작하므로 그대로 사용
const current_month = ref(base_date.getMonth())

//  get_month_data: offset을 받아서 해당 월/연 정보를 반환하는 함수
//    - offset은 -1, 0, 1 (이전 달, 현재 달, 다음 달)
//    - new Date는 자동으로 월이 12 이상이면 다음 해로, 0보다 작으면 이전 해로 계산됨
function get_month_data(offset) {
  const date = new Date(current_year.value, current_month.value + offset)
  return {
    year: date.getFullYear(), // 계산된 연도
    month: date.getMonth(), // 계산된 월 (0~11)
  }
}

//  visible_months: 화면에 보여줄 3개월 데이터 (이전/현재/다음 달)
//    - computed로 자동 갱신되며, 배열로 렌더링됨
const visible_months = computed(() => [
  get_month_data(-1), // 이전 달
  get_month_data(0), // 현재 달
  get_month_data(1), // 다음 달
])

//  이전 달로 이동하는 함수
//    - 월이 0 (1월)일 경우, 연도를 -1 하고 12월로 설정
//    - 아니면 단순히 -1
function go_to_prev_month() {
  if (current_month.value === 0) {
    current_month.value = 11
    current_year.value--
  } else {
    current_month.value--
  }
}

//  다음 달로 이동하는 함수
//    - 월이 11 (12월)일 경우, 연도를 +1 하고 1월로 설정
//    - 아니면 단순히 +1
function go_to_next_month() {
  if (current_month.value === 11) {
    current_month.value = 0
    current_year.value++
  } else {
    current_month.value++
  }
}
</script>

<template>
  <div class="calendar_carousel">
    <!-- 왼쪽 화살표: 이전 달로 이동 -->
    <button class="arrow" @click="go_to_prev_month">&lt;</button>

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
    <button class="arrow" @click="go_to_next_month">&gt;</button>
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
