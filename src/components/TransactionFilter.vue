<script setup>
/*
  이 컴포넌트는 상위 컴포넌트로부터
  수입과 지출 체크 상태를 props로 받고,
  체크 상태가 변경되면 update 이벤트를 emit합니다.
*/

</script>

<template>
  <!-- 수입/지출 필터 -->
  <div class="filter-container">
    <label class="income-checkbox">
      <!-- :checked와 @change를 이용해 부모와 연동 -->
      <input
        type="checkbox"
        :checked="showIncome"
        @change="e => $emit('update:showIncome', e.target.checked)"
      />
      <span>수입</span>
    </label>
    <label class="expense-checkbox">
      <input
        type="checkbox"
        :checked="showExpense"
        @change="e => $emit('update:showExpense', e.target.checked)"
      />
      <span>지출</span>
    </label>
  </div>
</template>


<style scoped>
.filter-container {
  display: flex;
  gap: 10px;
}
.income-checkbox,
.expense-checkbox {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}
</style>
