<template>
  <aside class="sidebar">
    <nav class="menu">
      <router-link to="/" class="nav-button">🏠 Home</router-link>
      <router-link to="/transaction" class="nav-button">💰 수입/지출 내역</router-link>

      <div class="nav-group">
        <div class="nav-group-title">📊 통계</div>
        <router-link to="/statistics/export" class="nav-sub-button">⬇️ 엑셀 내보내기</router-link>
        <router-link to="/statistics/summary" class="nav-sub-button">📄 요약 통계</router-link>
      </div>

      <router-link to="/summary" class="nav-button">🧾 요약</router-link>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  background-color: #f0f4f8;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
.menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.nav-button,
.nav-sub-button {
  padding: 10px;
  background-color: white;
  border-radius: 6px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s;
  display: block;
}
.nav-button:hover,
.nav-sub-button:hover {
  background-color: #cce3ff;
}
.router-link-active {
  font-weight: bold;
  background-color: #a4d8ff;
}

.nav-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-left: 0;
}
.nav-group-title {
  font-weight: bold;
  margin-bottom: 4px;
  padding-left: 4px;
  color: #555;
}
.nav-sub-button {
  padding-left: 20px;
  font-size: 0.95rem;
}
</style>
