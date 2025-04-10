<script setup>
import { ref } from 'vue'
import BudgetSetting from '@/components/BudgetSetting.vue'
import BudgetProgress from '@/components/BudgetProgress.vue'
import CalendarContent from '@/components/CalendarContent.vue'
import { statisticsStore } from '@/stores/statisticsStore'

const store = statisticsStore()

const isSetting = ref(false)
const progressRef = ref(null) // 예산 추가 시 바로 반영되기 위함

const budgetSetting = () => {
  isSetting.value = true
}

const handleSubmit = async () => {
  isSetting.value = false
  await store.calculateStatistics()
}
</script>

<template>
  <div class="BudgetPage">
    <CalendarContent />
    <BudgetProgress ref="progressRef" @setting="budgetSetting" />
    <BudgetSetting
      v-if="isSetting"
      @submit="handleSubmit"
      @close="isSetting = false"
    />
  </div>
</template>

<style scoped>
.BudgetPage {
  position: relative;
}
</style>
