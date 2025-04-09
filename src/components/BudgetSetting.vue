<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])

const closePopup = () => {
  emit('close')
}
</script>

<template>
  <div class="BudgetSetting">
    <div class="budget_popup">
      <p>예산 설정 페이지입니다.</p>
      <ul>
        <li>식비<input type="text" /></li>
      </ul>
      <div class="btn_wrap">
        <button class="popup_btn" @click="closePopup">확인</button>
        <button class="popup_btn" @click="closePopup">취소</button>
      </div>
    </div>
  </div>
</template>

<style scope>
.BudgetSetting {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999; /* 다른 컴포넌트 위에 오게 함 */
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4); /* 반투명 딤드 처리 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.budget_popup {
  background-color: white;
  border: 1px solid black;
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.popup_btn {
  width: 100px;
  background-color: white;
  color: black;
  border: 1px solid black;
}
.popup_btn:hover {
  background: #333;
}
.btn_wrap * {
  margin: 10px;
}
input {
  border: 1px solid black;
}
</style>
