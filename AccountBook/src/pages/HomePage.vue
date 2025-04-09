<script setup>
import CalendarContent from '@/components/CalendarContent.vue'
import SummaryCard from '@/components/SummaryCard.vue'
</script>

<template>
  <div class="home">
    <CalendarContent />
    <SummaryCard />
  </div>
</template>

<style scoped>
.home {
  justify-items: center;
}
</style>
