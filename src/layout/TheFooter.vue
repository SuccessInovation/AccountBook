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
  left: 300px;
  width: calc(100% - 300px); /* 사이드바 너비만큼 뺌 */
  height: 80px;
  display: flex;
  align-items: center;
  border-top: 0.5px solid var(--dark-brown);
  padding-right: 30px;
}
#copyright {
  margin-left: auto;
}
</style>
