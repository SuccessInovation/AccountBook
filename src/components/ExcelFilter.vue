<template>
  <form class="box" @submit.prevent="handleSubmit">
    <div class="search">
      <label class="period_selector">
        <input
          type="radio"
          value="1months"
          v-model="selectPeriod"
          checked="true"
        />
        1개월
      </label>
      <label class="period_selector">
        <input type="radio" value="3months" v-model="selectPeriod" />
        3개월
      </label>
      <label class="period_selector">
        <input type="radio" value="custom" v-model="selectPeriod" />
        기간설정
      </label>
      <button id="submit_btn" type="submit">조회</button>
    </div>
    <!-- 기간설정 class="period_selector" 선택 시에만 날짜 입력창 표시 -->
    <div class="date_inputs">
      <input
        id="date_start"
        class="period_selector"
        type="date"
        v-model="customStartDate"
      />
      <span>~</span>
      <input
        id="date_end"
        class="period_selector"
        type="date"
        v-model="customEndDate"
      />
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { statisticsStore } from '@/stores/statisticsStore'
import { defineEmits } from 'vue'

const store = statisticsStore()
const selectPeriod = ref('1months') // 초기값: 1개월

const customStartDate = ref('')
const customEndDate = ref('')

const emit = defineEmits(['search'])

// 조회 버튼 눌렀을 때
const handleSubmit = () => {
  console.log('선택된 기간:', selectPeriod.value)

  const today = new Date()
  if (selectPeriod.value === '1months') {
    store.fetchTranactionsByPeriod()
  } else if (selectPeriod.value === '3months') {
    const startDate = new Date()
    startDate.setMonth(today.getMonth() - 3)

    const start = startDate.toISOString().split('T')[0]
    store.fetchTranactionsByPeriod(start, today)
  } else if (selectPeriod.value === 'custom') {
    // 입력 확인
    if (!customStartDate.value || !customEndDate.value) {
      alert('시작일과 종료일을 모두 입력하세요.')
      return
    }

    store.fetchTranactionsByPeriod(customStartDate.value, customEndDate.value)
  }
  emit('search') // 조회 완료 → 부모 컴포넌트에게 알림!
}
</script>

<style scoped>
.box {
  background-color: rgb(228, 102, 102);
  height: 100px;
  font-size: 15px;
  display: block;
}
.box * {
  margin: 2.5px;
}
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 350px;
  height: auto;
  margin-top: 15px;
  background-color: lightblue;
}
.period_selector {
  font-weight: 700px;
}
#submit_btn {
  background-color: var(--color-point-1);
  color: white;
  font-weight: 500;
  font-size: 15px;
  width: 60px;
  height: 35px;
  border-radius: 10px;
  border: none;
}
.date_inputs {
  background-color: yellow;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 350px;
  height: auto;
}
#date_start,
#date_end {
  background-color: #fff;
  color: var(--font-family-main);
  font-weight: 500;
  font-size: 15px;
  width: 130px;
  height: 35px;
  border-radius: 10px;
  border: none;
}
</style>
