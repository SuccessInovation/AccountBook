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
          <router-link to="/">HOME</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/transaction">수입/지출 내역</router-link>
        </li>

        <!-- 통계 및 내보내기 + 서브메뉴 -->
        <li class="list-group-item submenu-wrapper">
          <div @click="toggleStatsSubMenu" style="cursor: pointer">
            통계 및 내보내기
          </div>
          <ul class="sub-menu" :class="{ 'sub-menu-open': showStatsSubMenu }">
            <li class="sub-item pt-3">
              <router-link to="/statistics/summary">요약 통계</router-link>
            </li>
            <li class="sub-item pt-2">
              <router-link to="/statistics/export">엑셀 내보내기</router-link>
            </li>
          </ul>
        </li>

        <li class="list-group-item">
          <router-link to="/budget">예산</router-link>
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
        <router-link to="/">HOME</router-link>
      </li>
      <li class="list-group-item">
        <router-link to="/transaction">수입/지출 내역</router-link>
      </li>

      <li class="list-group-item submenu-wrapper">
        <div @click="toggleStatsSubMenu" style="cursor: pointer">
          통계 및 내보내기
        </div>
        <ul class="sub-menu" :class="{ 'sub-menu-open': showStatsSubMenu }">
          <li class="sub-item pt-3">
            <router-link to="/statistics/summary">요약 통계</router-link>
          </li>
          <li class="sub-item pt-2">
            <router-link to="/statistics/export">엑셀 내보내기</router-link>
          </li>
        </ul>
      </li>

      <li class="list-group-item">
        <router-link to="/budget">예산</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.snb {
<<<<<<< HEAD
  background-color: var(--point-5-color);
=======
  background-color: var(--color-point-5);
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
  z-index: 1000;
}
.snb.navbar {
  z-index: 1001;
}
#snb_desktop {
<<<<<<< HEAD
  width: 300px;
}
/* 메인 메뉴 */
.main-menu {
  font-size: 22px;
  font-weight: 700;
=======
  width: 250px;
}
/* 메인 메뉴 */
.main-menu {
  font-size: 20px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
}
.mt-160 {
  margin-top: 40px;
}
.list-group-item {
  background-color: transparent;
  border: none;
<<<<<<< HEAD
  padding: 30px 10px 40px 50px;
}
.list-group-item:hover > a,
.list-group-item:hover > div {
  color: var(--point-1-color);
=======
  padding: 20px 10px 20px 50px;
}
.list-group-item:hover > a,
.list-group-item:hover > div {
  color: var(--color-point-1);
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
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
<<<<<<< HEAD
  max-height: 300px;
  opacity: 1;
}
.sub-item {
  padding: 15px 0 0 20px;
  font-size: 18px;
}
.sub-item:hover {
  color: var(--point-1-color);
=======
  max-height: 250px;
  opacity: 1;
}
.sub-item {
  padding: 15px 0 0 10px;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
}
.sub-item:hover {
  color: var(--color-point-1);
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
  transition: 0.3s;
}
/* 모바일 메뉴 버튼 */
.navbar {
  width: 50px;
}
.mobile-slide-menu {
  position: fixed;
  top: 120px;
<<<<<<< HEAD
  left: -300px; /* 화면 바깥 위치 */
  width: 300px;
  height: 100%;
  background-color: var(--point-5-color);
=======
  left: -250px; /* 화면 바깥 위치 */
  width: 250px;
  height: 100%;
  background-color: var(--color-point-5);
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
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
<<<<<<< HEAD
  background-color: var(--point-5-color);
=======
  background-color: var(--color-point-5);
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
  padding-top: 0;
  padding-bottom: 0;
  align-items: start;
}
.navbar-toggler {
  padding: 4px;
  border: none;
}
<<<<<<< HEAD
=======
.navbar-toggler:focus {
  outline: none;
  box-shadow: none;
}
/* 활성화된 메뉴 */
.router-link-active {
  color: var(--color-point-1); /* 초록색 유지 */
}
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
</style>
