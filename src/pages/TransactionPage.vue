<script setup>
import { storeToRefs } from 'pinia'
import { ref, onMounted, watch } from 'vue'
import { use_calendar_store } from '@/stores/MonthSelector'
// 거래 내역을 상태로 관리하는 Pinia store
import { useTransactionStore } from '@/stores/TransactionStore'

import CalendarContent from '@/components/CalendarContent.vue'
import AddListBtn from '@/components/AddListBtn.vue'
import TransactionContent from '@/components/TransactionContent.vue'
const transactionStore = useTransactionStore()
// setup 내에서 calendar 상태 불러오기
const calendar = use_calendar_store()

// 마운트될 때 거래 내역 불러오기
onMounted(() => {
  transactionStore.fetchTransactions()
})

const { visible_months } = storeToRefs(calendar)
const month_names = calendar.month_names

const activeTab = ref('list') // 기본 탭: list

// const tabs = ['목록', '달력']

// 페이지 로드 시 거래 내역 불러오기
onMounted(() => {
  transactionStore.fetchTransactions()
})

// 상태변수 초기값 설정

// '수입' 체크박스 - 기본: 체크됨
const incomeChecked = ref(true)
// '지출' 체크박스 - 기본: 체크됨
const expenseChecked = ref(true)
// 카테고리 필터 - 기본: all(전체)
const categorySelected = ref('all')

//#region 💰 금액 포맷 함수

/**
 * 금액에 부호(+, -)를 붙이고 천 단위 쉼표로 포맷된 문자열을 반환합니다.
 *
 * @param {string|number} value - 원본 금액 값 (문자열 / 숫자)
 * @param {string} type - 거래 유형 (income / expense)
 * @returns {string} 포맷된 금액 문자열 (예: +1,000 / -25,000)
 */

//#endregion

// 드롭다운 리렌더링(초기화)하기 위한 key
const resetKey = ref(0)

// '수입/지출' 체크박스 변경 감지
watch([incomeChecked, expenseChecked], () => {
  // 선택된 카테고리 초기화
  categorySelected.value = 'all'
  // 드롭다운 초기화 - key값 변경 시 컴포넌트 리렌더링
  resetKey.value++
})
</script>
<!-- 탭메뉴 -->
<template>
  <!-- 월 이동 컴포넌트 -->
  <div class="calendar_carousel">
    <button type="button" class="arrow" @click="calendar.go_to_prev_month">
      &lt;
    </button>

    <div class="month_slider">
      <div
        v-for="(month, index) in visible_months"
        :key="index"
        class="month_item"
      >
        <p :class="{ active: index === 1, faded: index !== 1 }">
          {{ month.year }} {{ month_names[month.month] }}
        </p>
      </div>
    </div>

    <button type="button" class="arrow" @click="calendar.go_to_next_month">
      &gt;
    </button>
  </div>
  <div class="container">
    <div>
      <!-- Bootstrap 탭 메뉴 -->
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'list' }"
            @click="activeTab = 'list'"
          >
            목록
          </button>
        </li>
        <li class="nav-item">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'calendar' }"
            @click="activeTab = 'calendar'"
          >
            달력
          </button>
        </li>
      </ul>

      <!-- 탭 콘텐츠 -->
      <div class="tab-content mt-3">
        <div v-if="activeTab === 'list'">
          <!-- 목록 보기 -->
          <TransactionContent />
        </div>
        <div v-else-if="activeTab === 'calendar'">
          <!-- 달력 보기 -->
          <CalendarContent />
        </div>
      </div>
    </div>
    <!-- 추가 버튼 -->
    <AddListBtn class="add_btn" />
  </div>

  <!-- 추가 버튼 -->
  <AddListBtn />
</template>

<style scoped>
/* 월 이동 컴포넌트 */
.calendar_carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.month_slider {
  display: flex;
  width: 500px;
  overflow: hidden;
  justify-content: space-between;
}

.month_item {
  width: 100px;
  text-align: center;
  font-size: 1.2rem;
  opacity: 0.6;
  transform: scale(0.9);
  transition: all 0.5s ease;
}

.month_item p {
  font-size: 2.5rem;
}
/* 월 이동 효과 */
.faded {
  opacity: 0.4;
}
.active {
  font-weight: bold;
}

.month_item.active {
  font-size: 1.5rem;
  font-weight: bold;
  opacity: 1;
  transform: scale(1.1);
}
/* 월이동 화살표 */
.arrow {
  font-size: 2rem;
  cursor: pointer;
  background: none;
  border: none;
  color: #4caf50;
  transition: transform 0.2s ease;
}
.arrow:hover {
  transform: scale(1.2);
}

/* 하단 '추가' 버튼 영역 */
.add-button-area {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
}
.add-button {
  background-color: #a3c39c;
  color: #fff;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.add-button:hover {
  background-color: #8eb58d;
}

/* 탭메뉴 */
.nav-tabs .nav-link {
  cursor: pointer;
}
/* '수입/지출' 체크박스  */
.align-items-center {
  border-radius: 15px;
}

/* '수입' 체크박스 */
#incomeCheck {
  background-color: var(--color-green-light);
  border-color: var(--color-point-1);
}

/* '수입' 체크박스 선택 */
#incomeCheck:checked {
  background-color: var(--color-point-1);
  border-color: var(--color-point-1);
}

/* '지출' 체크박스 */
#expenseCheck {
  background-color: var(--color-red-light);
  border-color: var(--color-red-100);
}

/* '지출' 체크박스 선택 */
#expenseCheck:checked {
  background-color: var(--color-red-100);
  border-color: var(--color-red-100);
}

/* 거래내역 없을 때 텍스트 */
#emptyTransaction {
  text-align: center;
  margin: 20px;
}
</style>
