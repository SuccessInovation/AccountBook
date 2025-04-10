<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
} from 'vue'
import { CATEGORY_MAP } from '@/constants/categories'

// 카테고리 목록 가져오기
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  // 체크박스 상태 변경 -> 드롭다운 초기화
  resetKey: {
    type: Number,
    default: 0,
  },
})

// 카테고리 목록에 '전체' 추가
const categoryList = computed(() => ['전체', ...props.categories])

// 선택된 카테고리 전달하기 위해 emit 정의
const emit = defineEmits(['categorySelected'])

// 초기값 설정 (선택 전 상태)
const categorySelected = ref('카테고리')
// 드롭다운 open/close 상태 저장
const isOpen = ref(false)

// 드롭다운 토글 함수
const toggleDropdown = () => {
  isOpen.value = !isOpen.value // 클릭 -> open/close 상태 변경
}

// 드롭다운 외부 영역 클릭 상태 감지
const dropdownRef = ref('')

// 외부 클릭 시 드롭다운 상태 close로 변경 함수
const clickOuterHandler = e => {
  // 외부 영역 클릭 -> 드롭다운 close
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

// 컴포넌트가 mount될 때 클릭 이벤트 등록
onMounted(() => {
  document.addEventListener('click', clickOuterHandler)
})

// 컴포넌트가 unmount될 때 (사라질 때) 클릭 이벤트 제거 (메모리 누수 방지)
onBeforeUnmount(() => {
  document.removeEventListener('click', clickOuterHandler)
})

// 카테고리 선택 시
const selectFilter = category => {
  categorySelected.value = category
  // 부모에게 선택된 카테고리 전달
  emit('categorySelected', category === '전체' ? 'all' : category)
  isOpen.value = false // 드롭다운 닫기
}

// restKey 감사
watch(
  () => props.resetKey,
  () => {
    categorySelected.value = '카테고리'
  },
)
</script>

<template>
  <div class="filter_category" ref="dropdownRef">
    <div class="filter_btn" @click="toggleDropdown">
      <!-- 드롭다운 버튼 -->
      <span>{{
        categorySelected === '카테고리'
          ? '카테고리'
          : CATEGORY_MAP[categorySelected]
      }}</span>
      <span class="icon_triangle">▼</span>
    </div>

    <!-- 드롭다운 항목 -->
    <ul v-if="isOpen" class="category_list">
      <!-- 선택된 카테고리 항목 강조하기 위해 클래스 지정 -->
      <li
        v-for="category in categoryList"
        :key="category"
        @click="selectFilter(category)"
        :class="{ selected: category === categorySelected }"
      >
        {{ category === '전체' ? '전체' : CATEGORY_MAP[category] || category }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* 전체 배경색 적용 */
.filter_category * {
  background-color: var(--white);
}

/* 전체 드롭다운 영역 */
.filter_category {
  position: relative; /* 드롭다운 기준 위치 */
  width: 160px;
  font-size: 14px;
}

/* 드롭다운 버튼 (카테고리 + ▼ 아이콘 포함) */
.filter_btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08); */
}

.filter_btn:hover {
  background-color: #f9f9f9;
  border-color: #aaa;
}

/* ▼ 아이콘 */
.icon_triangle {
  font-size: 12px;
  color: var(--green);
}

/* 드롭다운 목록 */
.category_list {
  position: absolute;
  top: calc(100% + 4px); /* 버튼 바로 아래에 배치 */
  left: 0;
  width: 100%;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 220px;
  overflow-y: auto;
}

/* 드롭다운 항목 */
.category_list li {
  padding: 10px 14px;
  color: #333;
  cursor: pointer;
  transition: 0.2s;
}

/* 마우스 오버 시 */
.category_list li:hover {
  background-color: #f0f0f0;
}

/* 선택된 항목 강조 */
.category_list li.selected {
  background-color: var(--lightgreen);
  font-weight: bold;
  color: var(--green);
}
</style>
