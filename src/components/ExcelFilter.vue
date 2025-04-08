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

    <!-- ✅ 기간설정 선택 시에만 날짜 입력창 표시 -->
    <div v-if="selectPeriod === 'custom'" class="date-inputs">
      <input type="date" v-model="customStartDate" />
      <span>~</span>
      <input type="date" v-model="customEndDate" />
    </div>

    <button type="submit">조회</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { statisticsStore } from '@/stores/statisticsStore';
import { defineEmits } from 'vue';

const store = statisticsStore();
const selectPeriod = ref('1months'); // 초기값: 1개월

const customStartDate = ref('');
const customEndDate = ref('');

const emit = defineEmits(['search']);

// 조회 버튼 눌렀을 때
const handleSubmit = () => {
  console.log('선택된 기간:', selectPeriod.value);

  const today = new Date();
  if (selectPeriod.value === '1months') {
    store.fetchRecordsByPeriod();
  } else if (selectPeriod.value === '3months') {
    const startDate = new Date();
    startDate.setMonth(today.getMonth() - 3);

    const start = startDate.toISOString().split('T')[0];
    store.fetchRecordsByPeriod(start, today);
  } else if (selectPeriod.value === 'custom') {
    // 입력 확인
    if (!customStartDate.value || !customEndDate.value) {
      alert('시작일과 종료일을 모두 입력하세요.');
      return;
    }

    store.fetchRecordsByPeriod(customStartDate.value, customEndDate.value);
  }
  emit('search'); // ✅ 조회 완료 → 부모 컴포넌트에게 알림!
};
</script>

<style scoped>
.box {
  width: 100%;
  border: 1px solid lightgray;
}
</style>
