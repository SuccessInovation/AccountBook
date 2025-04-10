<script setup></script>

<template>
  <div class="TheHeader">
    <h1>
<<<<<<< HEAD
      <div id="logo">
        <span>배추</span
        ><img id="img_logo" src="../img/cabbage/logo1.png" alt="로고" />
      </div>
=======
      <router-link to="/" id="logo">
        <span>배추</span
        ><img id="img_logo" src="../img/cabbage/logo1.png" alt="로고" />
      </router-link>
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
    </h1>
    <div class="header_title_wrapper">
      <div id="header_title">임시 제목: HOME</div>
    </div>
    <div id="img_profile">
      <img
        class="rounded-circle"
        src="../img/cabbage/pretty_cabbage.jpg"
        alt="프로필 이미지"
      />
    </div>
  </div>
</template>

<style scoped>
.TheHeader {
<<<<<<< HEAD
  position: relative;
=======
  position: fixed;
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
<<<<<<< HEAD
  background-color: var(--point-5-color);
  box-sizing: border-box;
}
/* 배추 로고 */
#logo {
  margin: 0;
  width: 300px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 45px;
  font-weight: bold;
  padding: 15px 0 0 40px;
=======
  background-color: var(--color-point-5);
  box-sizing: border-box;
}

/* 배추 로고 */
h1 {
  margin: 0;
  width: 250px;
  height: 100%;
  padding: 15px 50px;
  white-space: nowrap;
  overflow: hidden;
}
#logo {
  height: 100%;
  display: inline-flex;
  align-items: center;
  font-size: 45px;
  font-weight: bold;
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
}
#img_logo {
  width: 55px;
  height: 82px;
}
/* 화면 제목 */
.header_title_wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
}
#header_title {
  font-size: 27px;
  font-weight: bold;
  text-align: center;
<<<<<<< HEAD
=======
  white-space: nowrap;
  overflow: hidden;
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
}
/* 프로필 아이콘 */
#img_profile {
  position: fixed;
  right: 20px;
  width: 70px;
  height: 70px;
  /* object-fit: cover; 이미지 비율 잘 맞추기 */
  border-radius: 50%;
  border: 3px solid white;
  margin-left: auto;
  cursor: pointer;
}
<<<<<<< HEAD
#img_profile {
  width: 70px;
  height: 70px;
  object-fit: cover; /* 이미지 비율 잘 맞추기: 화면 비율 고정ㄴ*/
=======
/* 프로필 아이콘 */
#img_profile {
  position: fixed;
  right: 20px;
  width: 70px;
  height: 70px;
  object-fit: cover; /* 이미지 비율 잘 맞추기: 화면 비율 고정*/
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
  border-radius: 50%;
  border: 3px solid white;
  cursor: pointer;
  margin-right: 20px;
}
</style>
