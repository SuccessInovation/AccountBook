<script setup></script>

<template>
  <div class="app_wrapper">
    <div class="header">
      <h1>배추</h1>
      <img
        class="logo_png"
        src="../img/cabbage/logo1.png"
        alt="배추캐릭터로고"
      />
    </div>
    <form action="" method="post" class="login_form_box">
      <input
        class="input_login"
        type="email"
        name="email"
        id="email"
        placeholder="이메일"
      />
      <input
        class="input_login"
        type="password"
        name="password"
        id="password"
        placeholder="비밀번호"
      />
      <div class="options_row">
        <label class="checkbox_wrapper">
          <input type="checkbox" name="save_id" v-model="saveId" />
          <span>아이디 저장</span>
        </label>

        <a href="#" class="reset_link">비밀번호 초기화</a>
      </div>
      <button class="login_btn btn disabled_box">
        <router-link to="/home" class="clickable_text">로그인</router-link>
      </button>
      <button class="signfor_btn btn disabled_box">
        <router-link to="/register" class="clickable_text"
          >회원가입</router-link
        >
      </button>
    </form>
  </div>
</template>

<style scoped>
/* 전체 하얀 박스 */
.app_wrapper {
  width: 450px;
  height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-items: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 2rem;
}

/* h1 & 로고 */
.header {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: var(--color-point-1);
  /* border: 1px solid blueviolet; */
}
.logo_png {
  width: 55px;
}

/* 로그인 폼 박스 */
.login_form_box {
  display: flex;
  flex-direction: column;
  height: 400px;
  gap: 1rem;
  /* border: 1px solid blue; */
}
.input_login {
  width: 350px;
  height: 3rem;
  padding-left: 1rem;
  border: 1px solid var(--color-input-box);
  border-radius: 5px;
  background-color: var(--color-input-box);
}
.options_row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.checkbox_wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
}
.checkbox_wrapper input[type='checkbox'] {
  transform: scale(1.2); /* 숫자 조절하면 크기 변경 가능 */
  border: 2px solid var(--color-input-box);
}

.reset_link {
  font-size: 0.9rem;
  color: var(--font-color);
  text-decoration: none;
  cursor: pointer;
}
.login_btn {
  margin-top: 3rem;
  background-color: var(--color-point-1);
  color: var(--color-brown-very-light);
}
.signfor_btn {
  color: var(--color-point-1);
}
.disabled_box {
  pointer-events: none;
}
.clickable_text {
  pointer-events: auto; /* 이 글자만 클릭 가능하게 */
  cursor: pointer;
}
.btn {
  border: 1px solid var(--color-point-1);
  height: 4rem;
  border-radius: 10px;
}
</style>
