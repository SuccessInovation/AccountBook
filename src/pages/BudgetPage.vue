<script setup>
import BudgetSetting from '@/components/BudgetSetting.vue'
import BudgetProgress from '@/components/BudgetProgress.vue'
import CalendarContent from '@/components/CalendarContent.vue'
import { ref } from 'vue'

const isSetting = ref(false)

const budgetSetting = () => {
  isSetting.value = true
}
const budgetList = ref([]) // 예산 데이터 저장

const handleSubmit = data => {
  budgetList.value = data // 저장
  isSetting.value = false // 팝업 닫기
}
</script>

<template>
  <div class="BudgetPage">
    <CalendarContent />
    <BudgetProgress :budgetList="budgetList" @setting="budgetSetting" />
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
