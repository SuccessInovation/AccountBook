<!-- <template>
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

<script>
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
  position: relative;
}
.container_router_view {
  display: flex;
  left: 250px;
}
</style> -->
<template>
  <div :style="{ backgroundColor: backgroundColor }" class="app_wrap">
    <div v-if="layout === 'none'">
      <router-view />
    </div>
    <div v-else class="container">
      <TheHeader />
      <div class="content_main">
        <TheSidebar />
        <div class="container_router_view">
          <router-view />
        </div>
      </div>
      <TheFooter />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import TheHeader from './layout/TheHeader.vue'
import TheSidebar from './layout/TheSidebar.vue'
import TheFooter from './layout/TheFooter.vue'

const route = useRoute()

const layout = computed(() => route.meta.layout || 'default')
const backgroundColor = computed(() => route.meta.backgroundColor || '#fff')
</script>

<style>
.app_wrap {
  min-height: 100vh;
  transition: background-color 0.3s ease;
}
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
