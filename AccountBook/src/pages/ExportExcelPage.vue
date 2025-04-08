<template>
  <div class="ExportExcelPage">엑셀 내보내기 페이지
    <form @submit.prevent="handleSubmit">
    <label>
      <input type="radio" value="1months" v-model="selectPeriod" checked="true" /> 1개월
    </label>
    <label> <input type="radio" value="3months" v-model="selectPeriod" /> 3개월 </label>
    <label> <input type="radio" value="custom" v-model="selectPeriod" /> 기간설정 </label>
    <button type="submit">조회</button>
  </form>
  <div>기간설정 영역</div>
  <div>리스트 영역</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectPeriod = ref('1') // 초기값: 1개월

// 조회 버튼 눌렀을 때
const handleSubmit = () => {
  console.log('선택된 기간:', selectPeriod.value)
  // 필요 시 localStorage에 저장 가능
  localStorage.setItem('selectedPeriod', selectPeriod.value)
}
</script>

  </div>
</template>

<style scoped>

</style>
