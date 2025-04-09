<script setup>
import BudgetSetting from '@/components/BudgetSetting.vue'
import BudgetProgress from '@/components/BudgetProgress.vue'
import { ref } from 'vue'

const isSetting = ref(false)

const budgetSetting = () => {
  isSetting.value = true
}
</script>

<template>
  <div class="BudgetPage">
    <h1>예산 페이지</h1>
    <BudgetProgress @setting="budgetSetting" />
    <BudgetSetting v-if="isSetting" @close="isSetting = false" />
  </div>
</template>

<style scoped>
div {
  border: 1px solid lightblue;
}
</style>
