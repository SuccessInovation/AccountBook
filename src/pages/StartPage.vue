<script setup></script>

<template>
  <div class="StartPage">
    <section>
      <div class="wrap_content">
        <div class="introduction_box">
<<<<<<< HEAD
          <h1>배추<img src="../img/logo1.png" alt="" /></h1>
          <p>
            그 어디에서도 경험하지 못한 <br /><strong
              >실속 그 자체 온라인 가계부 배추!</strong
            >
          </p>
          <p>오늘도 배추하세요</p>
=======
          <div class="introduction_innerbox">
            <h1>배추</h1>
            <p>
              그 어디에서도 경험하지 못한 <br /><strong
                >실속 그 자체 온라인 가계부 배추!</strong
              >
            </p>
            <br />
            <p>오늘도 <strong>배추</strong>하세요</p>
          </div>
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
        </div>
        <div class="function_slide">
          <h2>제공하는 기능들 보여주는 슬라이드 (아래 > 위 슬라이드)</h2>
        </div>
<<<<<<< HEAD
        <div class="start-button-box">
          <router-link to="home">시작하기</router-link>
          <router-link to="login">로그인</router-link>
        </div>
=======
      </div>
      <div class="start-button-box">
        <router-link to="login">시작하기</router-link>
        <!-- <router-link to="home">홈으로</router-link> -->
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 전체 래핑 */
<<<<<<< HEAD
.StartPage {
  width: 100%;
}

h1 {
  font-size: 100px;
  margin-bottom: 1rem;
  margin-top: 0;
}
h1 > img {
  width: 100px;
}

=======
.StartPage,
.wrap_content,
.introduction_box,
h1 {
  overflow: visible;
}
.StartPage {
  width: 100%;
}
section {
  justify-items: center;
}
h1 {
  position: relative;
  font-size: 100px;
  margin-bottom: 1rem;
  margin-top: 0;
  color: var(--color-font-main);
}
h1::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: -3px;
  width: 120px;
  height: 200px;
  background-image: url('/src/img/cabbage/logo1.png');
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
}
p {
  color: var(--color-brown-dark);
}
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
/* 좌우 콘텐츠 배치 */
.wrap_content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
<<<<<<< HEAD
  align-items: center;
  gap: 2rem;
  margin: 0 auto;
  max-width: 960px;
  padding: 2rem;
=======

  align-items: center;

  margin: 0 auto;
  max-width: 960px;
  padding: 3rem;
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
}

/* 좌측 소개 박스 */
.introduction_box {
  flex: 1 1 400px;
  text-align: left;
<<<<<<< HEAD
}

/* 우측 기능 슬라이드 */
.function_slide {
  flex: 1 1 400px;
  text-align: center;
  border: 1px dashed #aaa;
  padding: 1rem;
  background-color: #aaa;
=======
  justify-items: center;
}
.introduction_innerbox {
  width: 350px;
  /* border: 1px solid black; */
}
/* 우측 기능 슬라이드 */
.function_slide {
  flex: 1 1 400px;
  width: 500px;
  height: 500px;
  border-radius: 10px;
  padding: 1rem;
  background-color: lightgray;
  align-content: center;
  text-align: justify;
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
}

/* 시작 버튼 박스 (가운데 정렬) */
.start-button-box {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 3rem;
}

/* 시작 버튼 스타일 */
<<<<<<< HEAD
.start-button {
  padding: 1rem 2rem;
  background-color: #7dbd55; /* 배추 연두색 느낌 */
=======
.start-button-box {
  width: 300px;
  padding: 1rem 2rem;
  background-color: var(--color-point-1); /* 배추 연두색 느낌 */
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
  color: white;
  font-weight: bold;
  border-radius: 12px;
  text-decoration: none;
  transition: background-color 0.3s;
}

<<<<<<< HEAD
.start-button:hover {
  background-color: #6aa946; /* hover 색 살짝 어둡게 */
=======
.start-button-box:hover {
  background-color: var(--color-brown-light);
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
}

@keyframes slide-up {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
