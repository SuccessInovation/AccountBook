<script setup>
import { ref } from 'vue'

const showMobileMenu = ref(false)
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const showStatsSubMenu = ref(false)
const toggleStatsSubMenu = () => {
  showStatsSubMenu.value = !showStatsSubMenu.value
}
</script>

<template>
  <div id="snb_desktop" class="snb d-lg-block d-none">
    <!-- 큰 화면: 사이드바 -->
    <div class="sidebar-container">
      <ul class="main-menu list-group list-group-flush">
        <li class="list-group-item mt-160">
          <a href="#" class="text-decoration-none">HOME</a>
        </li>
        <li class="list-group-item">
          <a href="#" class="text-decoration-none">수입/지출 내역</a>
        </li>

        <!-- 통계 및 내보내기 + 서브메뉴 -->
        <li class="list-group-item submenu-wrapper">
          <div @click="toggleStatsSubMenu" style="cursor: pointer">
            통계 및 내보내기
          </div>
          <ul class="sub-menu" :class="{ 'sub-menu-open': showStatsSubMenu }">
            <li class="sub-item pt-3">
              <a href="#" class="text-decoration-none">요약 통계</a>
            </li>
            <li class="sub-item pt-2">
              <a href="#" class="text-decoration-none">엑셀 내보내기</a>
            </li>
          </ul>
        </li>

        <li class="list-group-item">
          <a href="#" class="text-decoration-none">예산</a>
        </li>
      </ul>
    </div>
  </div>
  <!-- 작은 화면: 햄버거 버튼 -->
  <nav class="navbar d-lg-none snb" id="snb_btn_area">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" @click="toggleMobileMenu">
        <img
          src="../img/icons/bars-solid.svg"
          alt="메뉴버튼"
          class="custom-toggler-icon"
        />
      </button>
    </div>
  </nav>

  <!-- 작은 화면: 메뉴 (햄버거 펼쳤을 때) -->
  <div
    class="mobile-slide-menu d-lg-none snb"
    :class="{ open: showMobileMenu }"
  >
    <ul class="list-group list-group-flush main-menu">
      <li class="list-group-item mt-160">
        <a href="#" class="text-decoration-none">HOME</a>
      </li>
      <li class="list-group-item">
        <a href="#" class="text-decoration-none">수입/지출 내역</a>
      </li>

      <li class="list-group-item submenu-wrapper">
        <div @click="toggleStatsSubMenu" style="cursor: pointer">
          통계 및 내보내기
        </div>
        <ul class="sub-menu" :class="{ 'sub-menu-open': showStatsSubMenu }">
          <li class="sub-item pt-3">
            <a href="#" class="text-decoration-none">요약 통계</a>
          </li>
          <li class="sub-item pt-2">
            <a href="#" class="text-decoration-none">엑셀 내보내기</a>
          </li>
        </ul>
      </li>

      <li class="list-group-item">
        <a href="#" class="text-decoration-none">예산</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.snb {
  background-color: var(--point-5-color);
  z-index: 1000;
}
.snb.navbar {
  z-index: 1001;
}
#snb_desktop {
  width: 300px;
}
/* 메인 메뉴 */
.main-menu {
  font-size: 22px;
  font-weight: 700;
}
.mt-160 {
  margin-top: 40px;
}
.list-group-item {
  background-color: transparent;
  border: none;
  padding: 30px 10px 40px 50px;
}
.list-group-item:hover > a,
.list-group-item:hover > div {
  color: var(--point-1-color);
  transition: 0.3s;
}
/* 서브 메뉴 */
.sub-menu {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition:
    max-height 1s ease,
    opacity 0.3s ease;
}
.sub-menu.sub-menu-open {
  max-height: 300px;
  opacity: 1;
}
.sub-item {
  padding: 15px 0 0 20px;
  font-size: 18px;
}
.sub-item:hover {
  color: var(--point-1-color);
  transition: 0.3s;
}
/* 모바일 메뉴 버튼 */
.navbar {
  width: 50px;
}
.mobile-slide-menu {
  position: fixed;
  top: 120px;
  left: -300px; /* 화면 바깥 위치 */
  width: 300px;
  height: 100%;
  background-color: var(--point-5-color);
  transition: left 0.3s ease;
  z-index: 1000;
}
.mobile-slide-menu.open {
  left: 50px; /* 오른쪽으로 슬라이드 인 */
  top: 120px;
}
.custom-toggler-icon {
  width: 25px;
  height: 25px;
}
#snb_btn_area {
  background-color: var(--point-5-color);
  padding-top: 0;
  padding-bottom: 0;
  align-items: start;
}
.navbar-toggler {
  padding: 4px;
  border: none;
}
</style>
