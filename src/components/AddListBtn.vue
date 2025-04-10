<script setup>
import { ref } from 'vue'
import PopupPage from '@/pages/PopupPage.vue'

const showPopup = ref(false)

function goToPopup() {
  showPopup.value = true
}
</script>

<template>
  <div class="add-button-area">
    <button class="add-button" @click="goToPopup">추가 +</button>
  </div>

  <!-- 팝업이 열릴 때만 보여짐 -->
  <PopupPage v-if="showPopup" @close="showPopup = false" />
</template>

<style scoped>
/* 하단 '추가' 버튼 영역 */
.add-button-area {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
}
.add-button {
  background-color: var(--color-point-3);
  color: #fff;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.add-button:hover {
  background-color: var(--color-point-1);
}
</style>
