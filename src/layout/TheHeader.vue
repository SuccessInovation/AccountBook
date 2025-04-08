<script setup></script>

<template>
  <div class="TheHeader">
    <h1>
      <div class="logo">
        <span>배추</span
        ><img id="img_logo" src="../img/cabbage/logo1.png" alt="로고" />
      </div>
      <div class="header_title">임시 제목: HOME</div>
    </h1>
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
  height: 115px;
  background-color: var(--point-5-color);
  position: fixed;
  width: 100%;
  height: 115px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.logo {
  display: flex;
  align-items: center;
  font-size: 50px;
  font-weight: bold;
  margin: 15px 0 0 40px;
}
#img_logo {
  width: 55px;
  height: 82px;
}
.header_title {
  font-size: 27px;
  font-weight: bold;
}
#img_profile {
  width: 70px;
  height: 70px;
  object-fit: cover; /* 이미지 비율 잘 맞추기 */
  border-radius: 50%; /* 진짜 동그랗게 만들기 */
  border: 3px solid white;
}
</style>
<!--
<template>
  <header class="header">
    <h1></h1>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  padding-left: 220px; /* sidebar 공간 확보 */
  padding-right: 1rem;
  box-sizing: border-box;

  top: 0;
}
</style> -->
