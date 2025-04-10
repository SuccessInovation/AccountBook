<!-- src/components/CalendarContent.vue -->
<script setup>
import { storeToRefs } from 'pinia'
import { use_calendar_store } from '@/stores/MonthSelector'

const calendar = use_calendar_store()
const { visible_months } = storeToRefs(calendar)
const month_names = calendar.month_names
</script>

<template>
  <div class="calendar_carousel">
    <button type="button" class="arrow" @click="calendar.go_to_prev_month">
      &lt;
    </button>

    <div class="month_slider">
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

    <button type="button" class="arrow" @click="calendar.go_to_next_month">
      &gt;
    </button>
  </div>
</template>

<style scoped>
.calendar_carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.month_slider {
  display: flex;
  width: 500px;
  overflow: hidden;
  justify-content: space-between;
}

.month_item {
  width: 100px;
  text-align: center;
  font-size: 1.2rem;
  opacity: 0.6;
  transform: scale(0.9);
  transition: all 0.5s ease;
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

.month_item.active {
  font-size: 1.5rem;
  font-weight: bold;
  opacity: 1;
  transform: scale(1.1);
}

.arrow {
  font-size: 5rem;
  cursor: pointer;
  background: none;
  border: none;
  color: #4caf50;
  transition: transform 0.2s ease;
}
.arrow:hover {
  transform: scale(1.2);
}
</style>
