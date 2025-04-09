<template>
  <div class="container">
    <TheHeader />
    <div class="content_main">
      <TheSidebar />
      <div class="container_router_view">
        <router-view />
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// 레이아웃 컴포넌트 불러오기
import TheHeader from './layout/TheHeader.vue'
import TheSidebar from './layout/TheSidebar.vue'
import TheFooter from './layout/TheFooter.vue'

export default {
  components: {
    TheHeader,
    TheSidebar,
    TheFooter,
  },
}
</script>

<style>
.container {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content_main {
  display: flex;
  flex: 1;
  margin-top: 120px; /* 헤더 높이 */
}
.container_router_view {
  flex: 1;
}
</style>
