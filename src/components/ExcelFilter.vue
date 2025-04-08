<script setup>
import { ref } from 'vue'
import { statisticsStore } from '@/stores/statisticsStore'

const store = statisticsStore()
const selectPeriod = ref('1months') // 초기값: 1개월

// 조회 버튼 눌렀을 때
const handleSubmit = () => {
  const today = new Date()
  console.log('선택된 기간:', selectPeriod.value)
  if (selectPeriod.value === '1months') {
    store.fetchRecordsByPeriod()
  } else if (selectPeriod.value === '3months') {
    const startDate = new Date()
    startDate.setMonth(today.getMonth() - 1)
    const start = startDate.toISOString().split('T')[0]
    store.fetchRecordsByPeriod(start)
  }
}
</script>

<template>
  <form class="box" @submit.prevent="handleSubmit">
    <label>
      <input
        type="radio"
        value="1months"
        v-model="selectPeriod"
        checked="true"
      />
      1개월
    </label>
    <label>
      <input type="radio" value="3months" v-model="selectPeriod" /> 3개월
    </label>
    <label>
      <input type="radio" value="custom" v-model="selectPeriod" /> 기간설정
    </label>
    <button>조회</button>
  </form>
  <div class="box">기간설정 영역</div>
</template>

<style scoped>
.box {
  width: 100%;
  border: 1px solid lightgray;
}
</style>
