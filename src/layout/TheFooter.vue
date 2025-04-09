<script setup></script>

<template>
  <div class="TheFooter">
    <span id="copyright"
<<<<<<< HEAD
      >copyright &copy; 2025 성공하면 혁신!조. All rights reserved.</span
=======
      >copyright &copy 2025 성공하면 혁신!조. All rights reserved.</span
>>>>>>> 341ebbf (Design: TheFooter.vue 완료)
    >
  </div>
</template>

<style scoped>
.TheFooter {
  color: var(--font-color);
  position: fixed;
  bottom: 0;
<<<<<<< HEAD
  width: 100%;
=======
  left: 300px;
  width: calc(100% - 300px); /* 사이드바 너비만큼 뺌 */
>>>>>>> 341ebbf (Design: TheFooter.vue 완료)
  height: 80px;
  display: flex;
  align-items: center;
  border-top: 0.5px solid var(--dark-brown);
  padding-right: 30px;
<<<<<<< HEAD
  z-index: 1; /* 사이드바 밑으로 오게 설정 */
=======
>>>>>>> 341ebbf (Design: TheFooter.vue 완료)
}
#copyright {
  margin-left: auto;
}
</style>
