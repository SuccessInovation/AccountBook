<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['setting'])

const budgetSetting = () => {
  console.log('클릭됨')

  emit('setting')
}
</script>

<template>
  <div class="BudgetProgress">
    <p>예산 그래프 페이지</p>
    <button class="cab_btn" @click.prevent="budgetSetting">배추버튼</button>
  </div>
</template>
<style scoped>
.cab_btn {
  border: 1px solid blue;
}
.cab_btn:hover {
  background-color: blue;
  color: white;
}
</style>
