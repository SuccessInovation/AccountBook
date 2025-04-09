<script setup>
import { ref } from 'vue'
import BudgetSetting from '@/components/BudgetSetting.vue'
import BudgetProgress from '@/components/BudgetProgress.vue'
import CalendarContent from '@/components/CalendarContent.vue'

const isSetting = ref(false)
const progressRef = ref(null) // 예산 추가 시 바로 반영되기 위함

const budgetSetting = () => {
  isSetting.value = true
}

const handleSubmit = () => {
  isSetting.value = false // 팝업 닫기
  progressRef.value?.refresh() // ✅ 저장 후 진척도 갱신
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
div {
  border: 1px solid lightblue;
}
</style>
