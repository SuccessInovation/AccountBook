<template>
  <div class="app-layout">
    <!-- 현재 라우터가 기본(default) 레이아웃인 경우에만 헤더 표시 -->
    <TheHeader v-if="layout === 'default'" />

    <!-- 메인 영역: 사이드바 + 본문 -->
    <div class="main-area">
      <!-- 사이드바도 기본 레이아웃에서만 표시 -->
      <TheSidebar v-if="layout === 'default'" />

      <!-- 페이지 컨텐츠 영역 (각 페이지는 router-view에 렌더링됨) -->
      <main class="main-content">
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
import TheHeader from './layout/TheHeader.vue'
import TheSidebar from './layout/TheSidebar.vue'
import TheFooter from './layout/TheFooter.vue'

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
.app-layout {
  width: 1500px;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 메인 영역: 가로 정렬(flex row), 헤더 제외한 나머지 */
.main-area {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* router-view가 들어가는 본문 영역 */
.main-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>
