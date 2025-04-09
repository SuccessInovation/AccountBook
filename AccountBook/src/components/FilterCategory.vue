<script setup>
import { ref, defineEmits, onMounted, onBeforeUnmount } from 'vue'

// 입력된 검색내용 전달하기 위해 emit 정의
const emit = defineEmits(['memoInputted'])

// 사용자가 입력하는 텍스트를 저장할 반응형 변수 (입력 중 텍스트)
const inputText = ref('')

// 입력창 외부 클릭 시 포커스를 해제하기 위한 DOM 참조 변수
const inputRef = ref(null)
const isFocused = ref(false) // 포커스 여부 저장

// 외부 클릭 시 포커스 해제 처리 함수
const clickOuterHandler = e => {
  if (inputRef.value && !inputRef.value.contains(e.target)) {
    isFocused.value = false
  }
}

// 컴포넌트가 화면에 나타날 때 클릭 이벤트 등록
onMounted(() => {
  document.addEventListener('click', clickOuterHandler)
})

// 컴포넌트가 사라질 때 클릭 이벤트 해제 (메모리 누수 방지)
onBeforeUnmount(() => {
  document.removeEventListener('click', clickOuterHandler)
})

// 메모 검색 시 emit
const submitSearch = () => {
  emit('memoInputted', inputText.value)
}

// 입력값이 바뀔 때마다 부모 컴포넌트에 전달
const onInput = () => {
  emit('memoInputted', inputText.value)
}
</script>

<template>
  <div class="memo_input_wrap" ref="inputRef">
    <!-- 좌측 텍스트 -->
    <span class="memo_label"></span>

    <!-- 입력창 -->
    <input
      v-model="inputText"
      @keydown.enter="submitSearch"
      @focus="isFocused = true"
      type="text"
      class="memo_input"
      placeholder="메모 검색"
    />

    <!-- 입력 즉시 결과 보고 싶으면 @input="onInput" -->

    <!-- 돋보기 아이콘 -->
    <span class="search_icon" @click="submitSearch">🔍</span>
  </div>
</template>

<style scoped>
/* 전체 배경색 적용 */
.memo_input_wrap * {
  background-color: var(--white);
}

/* 전체 감싸는 박스 스타일 */
.memo_input_wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background-color: #fff;
  border-radius: 18px;
  max-width: 400px;
  width: 300px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s ease;
}

/* 입력창 포커스 시 테두리 색상 변경 */
.memo_input_wrap:focus-within {
  border-color: var(--green);
}

/* 검색 입력창 */
.memo_input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 18px;
  background-color: transparent;
}

/* 돋보기 아이콘 */
.search_icon {
  font-size: 18px;
}

/* 돋보기 아이콘 hover이벤트 */
.search_icon:hover {
  cursor: pointer;
}
</style>
