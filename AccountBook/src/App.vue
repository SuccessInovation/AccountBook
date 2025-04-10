<template>
  <div id="app" class="app_layout" :style="backgroundStyle">
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

// 시작페이지만 메타태그 이용한 배경색 적용
const backgroundStyle = computed(() => {
  const color = route.meta.backgroundColor || '#b7ccb4'
  return {
    backgroundColor: color,
  }
})
</script>

<style scoped>
/* 전체 레이아웃: 세로 정렬(flex column) */
.app_layout {
  width: 100vw;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

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
  align-content: center;
}
.main_content.full {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}
</style>
