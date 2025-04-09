<script setup></script>

<template>
  <div class="TheFooter">
    <span id="copyright"
      >copyright &copy 2025 성공하면 혁신!조. All rights reserved.</span
    >
  </div>
</template>

<style scoped>
.TheFooter {
  color: var(--font-color);
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  border-top: 0.5px solid var(--dark-brown);
  padding-right: 30px;
  z-index: 1; /* 사이드바 밑으로 오게 설정 */
}
#copyright {
  margin-left: auto;
}
</style>
