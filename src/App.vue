<template>
<<<<<<< HEAD
  <div id="app" class="app_layout">
    <!-- 현재 라우터가 기본(default) 레이아웃인 경우에만 헤더 표시 -->
    <TheHeader v-if="layout === 'default'" />

    <!-- 메인 영역: 사이드바 + 본문 -->
    <div class="main_area">
      <!-- 사이드바도 기본 레이아웃에서만 표시 -->
      <TheSidebar v-if="layout === 'default'" />

      <!-- 페이지 컨텐츠 영역 (각 페이지는 router-view에 렌더링됨) -->
      <!-- 시작 / 로그인 페이지 등은 뷰포트 너비 전체를 차지하게 하는 설정 -->
      <main class="main_content" :class="{ full: layout === 'none' }">
        <router-view />
      </main>
    </div>

    <!-- 푸터도 기본 레이아웃에서만 표시 -->
    <TheFooter v-if="layout === 'default'" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// 레이아웃 컴포넌트 불러오기
=======
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
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
import TheHeader from './layout/TheHeader.vue'
import TheSidebar from './layout/TheSidebar.vue'
import TheFooter from './layout/TheFooter.vue'

<<<<<<< HEAD
// 현재 라우터 정보를 가져옴
const route = useRoute()

// 라우터에 설정된 meta 정보를 기준으로 현재 레이아웃을 판단
// 기본값은 'default' (헤더/사이드바/푸터가 있는 레이아웃)
const layout = computed(() => {
  return route.meta.layout || 'default'
})
</script>

<style scoped>
/* 전체 레이아웃: 세로 정렬(flex column) */
.app_layout {
  width: 100vw;
=======
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
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
  display: flex;
  flex-direction: column;
  height: 100vh;
}
<<<<<<< HEAD

/* 메인 영역: 가로 정렬(flex row), 헤더 제외한 나머지 */
.main_area {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* router-view가 들어가는 본문 영역 */
.main_content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
.main_content.full {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
=======
.content_main {
  display: flex;
  flex: 1;
  margin-top: 120px; /* 헤더 높이 */
}
.container_router_view {
  flex: 1;
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
}
</style>
