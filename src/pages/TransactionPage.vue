<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// 거래 내역을 상태로 관리하는 Pinia store
import { useTransactionStore } from '@/stores/TransactionStore'
import { useRouter } from 'vue-router'

// 필터링 컴포넌트 (카테고리 선택 / 메모 검색창)
import FilterCategory from '@/components/FilterCategory.vue'
import SearchByMemo from '@/components/SearchByMemo.vue'

// 미리 정의된 카테고리 목록 (수입 / 지출), 카테고리 항목 '영어 - 한글' 매핑
import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
  CATEGORY_MAP,
} from '@/constants/categories'

// 내역 추가 버튼 누르면 나타나는 입력 팝업창
import PopupPage from '@/pages/PopupPage.vue'

// Pinia store 불러오기
const transactionStore = useTransactionStore()
const router = useRouter()

// 마운트될 때 거래 내역 불러오기
onMounted(() => {
  transactionStore.fetchTransactions()
})

//====================================
//====================================

const isAllSelected = computed(() =>
  transactionStore.transactions.every(record => record.selected === true),
)

function toggleSelectAll(event) {
  const checked = event.target.checked
  transactionStore.transactions.forEach(record => {
    record.selected = checked
  })
}

// 내역 추가하는 팝업창 상태 (초기값 : false)
const showPopup = ref(false)
function openPopup() {
  showPopup.value = true
}
function closePopup() {
  showPopup.value = false
}

onMounted(() => {
  transactionStore.fetchTransactions()
})

function toggleRow(record, event) {
  // 만약 클릭한 요소가 이미 수정/삭제 아이콘 등 click.stop 처리된 요소가 아니라면,
  // 해당 행의 체크 상태를 토글
  record.selected = !record.selected
}

//====================================
//====================================

// 상태변수 초기값 설정

// '수입' 체크박스 - 기본: 체크됨
const incomeChecked = ref(true)
// '지출' 체크박스 - 기본: 체크됨
const expenseChecked = ref(true)
// 카테고리 필터 - 기본: all(전체)
const categorySelected = ref('all')
// 메모 검색창 - 기본: ''
const memoInputted = ref('')

// '수입/지출' 체크박스 상태를 기준으로 거래 내역 필터링
// 타입 불일치 해결: 'income'/'expense' -> '수입'/'지출'로 변경
const filteredTransactions = computed(() => {
  return transactionStore.transactions.filter(record => {
    // type이 '수입' & '수입' 체크박스 체크 O
    if (record.type === 'income' && incomeChecked.value) return true
    // type이 '지출' & '지출' 체크박스 체크 O
    if (record.type === 'expense' && expenseChecked.value) return true
    // '수입/지출' 체크박스 모두 체크 X
    return false
  })
})

// prettyAmount 함수도 동일하게 타입 수정
function prettyAmount(value, type) {
  // 문자열 -> 숫자로 변환
  const amt = parseFloat(value)
  // 예외처리 : 숫자 X -> 그대로 반환
  if (isNaN(amt)) return value

  // 천 단위로 쉼표(,) 붙이기
  const formatted = amt.toLocaleString()

  // 거래 유형에 따라 '+/-'부호 추가
  if (type === 'input') return `+${formatted}`
  if (type === 'expense') return `-${formatted}`

  // 예외처리 : 그 외의 type -> 부호 없이 반환
  return formatted
}

// 중복된 onMounted 제거하기
// script setup 부분의 코드 정리
//#endregion

// '수입/지출' 체크박스 상태를 기준으로 거래내역 목록
const availableCategories = computed(() => {
  // '수입/지출' 체크박스 모두 체크 O
  if (incomeChecked.value && expenseChecked.value) {
    return [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES] // 모든 카테고리 반환
    // '수입'체크박스만 체크 O
  } else if (incomeChecked.value) {
    return [...INCOME_CATEGORIES]
    // '지출'체크박스만 체크 O
  } else if (expenseChecked.value) {
    return [...EXPENSE_CATEGORIES]
    // '수입/수출' 체크박스 모두 체크 X
  } else {
    return [] // 빈 배열 반환 (드롭다운 항목 X)
  }
})

// 카테고리 선택 이벤트
const CategoryChangeHandler = category => {
  // FilteredCategory.vue(자식 컴포넌트)에서 emit된 값
  categorySelected.value = category
}

// 메모 검색창 입력 이벤트
const MemoSearchHandler = text => {
  // 검색어 - 소문자로 변경, 공백 제거
  memoInputted.value = text.toLowerCase().trim()
}

// 필터링된 거래내역 (카테고리 + 메모)
const filteredList = computed(() => {
  return filteredTransactions.value.filter(item => {
    // 선택된 카테고리가 'all'이거나 선택된 카테고리와 카테고리가 같은 항목
    const categoryMatch =
      categorySelected.value === 'all' ||
      item.category === categorySelected.value

    // 메모 검색어가 비어있거나 메모 검색어가 메모에 들어있는 경우 - 검색어 모두 소문자로 변경
    const memoMatch =
      memoInputted.value === '' ||
      (item.memo && item.memo.toLowerCase().includes(memoInputted.value))

    // 두 조건을 모두 만족하는 항목 반환
    return categoryMatch && memoMatch
  })
})

// 드롭다운 리렌더링(초기화)하기 위한 key
const resetKey = ref(0)

// '수입/지출' 체크박스 변경 감지
watch([incomeChecked, expenseChecked], () => {
  // 선택된 카테고리 초기화
  categorySelected.value = 'all'
  // 드롭다운 초기화 - key값 변경 시 컴포넌트 리렌더링
  resetKey.value++
})

// 삭제 이벤트 처리
async function handleDelete(id) {
  if (confirm('정말 삭제하시겠습니까?')) {
    try {
      await transactionStore.deleteTransaction(id)
      // 삭제 후 최신 내역으로 갱신할 필요가 있다면 fetchTransactions()를 호출
      await transactionStore.fetchTransactions()
    } catch (error) {
      console.error('거래 삭제 오류:', error)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }
}

// 수정 이벤트 처리 (라우터를 통해 수정 페이지로 이동)
// 기존에는 팝업 창을 사용했으나, 여기서는 라우터를 통한 이동 방식을 사용합니다.
function handleEdit(record) {
  console.log('수정할 거래 id:', record.id)
  router.push({
    name: 'TransactionEdit',
    params: { id: record.id },
  })
}

function handleSelectedDelete() {
  // 1. 선택된 거래들의 id 목록 얻기
  const selectedIds = transactionStore.transactions
    .filter(record => record.selected)
    .map(record => record.id)

  if (selectedIds.length === 0) {
    alert('삭제할 항목이 없습니다!')
    return
  }

  // 2. 사용자가 정말 삭제할지 confirm 창으로 확인
  if (confirm('선택한 항목을 정말 삭제하시겠습니까?')) {
    // 3. 스토어나 API를 이용하여 각각 삭제
    selectedIds.forEach(id => {
      transactionStore.deleteTransaction(id)
    })
    // or 서버에 일괄 삭제 API가 있다면 그걸 호출하는 식으로 처리
  }
}

function handleDeleteAll() {
  if (transactionStore.transactions.length === 0) {
    alert('삭제할 항목이 없습니다!')
    return
  }

  if (confirm('정말 모든 항목을 삭제하시겠습니까?')) {
    transactionStore.transactions.forEach(record => {
      transactionStore.deleteTransaction(record.id)
    })
    // 또는 서버에 "전체 삭제"를 지원하는 API가 있다면 한 번에 호출
  }
}
</script>

<template>
  <div class="TransactionPage">
    <div
      class="container-fluid px-4 py-4"
      style="background-color: #b0c9a3; min-height: 100vh"
    >
      <div
        class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2"
      >
        <div class="delete_btn">
          <button @click="handleSelectedDelete">선택 삭제</button>
          <button @click="handleDeleteAll">전체 삭제</button>
        </div>
        <!-- 드롭다운 -->
        <!-- 카테고리 필터 컴포넌트 -->
        <!-- props - 'FilterCategory.vue'로 '카테고리/resetKey' 전달 -->
        <FilterCategory
          :categories="availableCategories"
          :resetKey="resetKey"
          @categorySelected="CategoryChangeHandler"
        />
        <!-- 메모 검색창 컴포넌트 -->
        <SearchByMemo @memoInputted="MemoSearchHandler" />

        <!-- '수입/지출' 체크박스 -->
        <!-- bootstrap -->
        <div class="d-flex gap-3 mb-3">
          <!-- '수입' 체크박스 -->
          <div class="form-check form-check-inline checkbox_income">
            <input
              class="form-check-input"
              type="checkbox"
              id="incomeCheck"
              v-model="incomeChecked"
            />
            <label class="form-check-label" for="incomeCheck">수입</label>
          </div>

          <!-- '지출' 체크박스 -->
          <div class="form-check form-check-inline checkbox_expense">
            <input
              class="form-check-input"
              type="checkbox"
              id="expenseCheck"
              v-model="expenseChecked"
            />
            <label class="form-check-label" for="expenseCheck">지출</label>
          </div>
        </div>

        <!-- 거래내역 -->
        <div
          class="table-responsive rounded shadow-sm bg-white px-3 w-100"
          style="max-height: 400px; overflow-y: auto"
        >
          <table class="table table-hover mb-0 text-center align-middle">
            <thead class="table-light">
              <tr>
                <th scope="col" style="width: 40px">
                  <input
                    type="checkbox"
                    :checked="isAllSelected"
                    @change="toggleSelectAll($event)"
                  />
                </th>
                <th scope="col" style="width: 160px">날짜</th>
                <th scope="col" style="width: 150px">카테고리</th>
                <!-- width 지정 X:남은 공간 자동으로 차지 -->
                <th scope="col" style="width: auto">메모</th>
                <th scope="col" style="width: 150px" class="text-end">금액</th>
                <th scope="col" style="width: 60px">수정</th>
                <th scope="col" style="width: 60px">삭제</th>
              </tr>
            </thead>
            <!-- =========혁신========== -->
            <!-- ===========수정======== -->
            <!-- =================== -->
            <!-- =================== -->
            <tbody>
              <tr
                v-for="filtered in filteredList"
                :key="filtered.id"
                @click="toggleRow(filtered, $event)"
                style="cursor: pointer"
              >
                <!-- 체크박스 칼럼: 체크박스 자체에는 클릭 전파를 중지 -->
                <td>
                  <input
                    type="checkbox"
                    v-model="filtered.selected"
                    @click.stop
                    st
                  />
                </td>
                <td>{{ filtered.date }}</td>
                <td>
                  {{ CATEGORY_MAP[filtered.category] || filtered.category }}
                </td>
                <td class="text-truncate" style="max-width: 300px">
                  {{ filtered.memo }}
                </td>
                <td class="text-end">
                  {{ prettyAmount(filtered.amount, filtered.type) }} 원
                </td>
                <!-- 수정 아이콘: 클릭 시 행 토글 방지를 위해 click.stop 사용 -->
                <td>
                  <i
                    class="text-success d-block mx-auto icon-hover"
                    @click.stop="handleEdit(filtered)"
                    style="cursor: pointer"
                    >✏️</i
                  >
                </td>
                <!-- 삭제 아이콘: 클릭 시 행 토글 방지를 위해 click.stop 사용 -->
                <td>
                  <i
                    class="text-danger d-block mx-auto icon-hover"
                    @click.stop="handleDelete(filtered.id)"
                    style="cursor: pointer"
                    >🗑️</i
                  >
                </td>
              </tr>
            </tbody>
            <!-- =================== -->
            <!-- =================== -->
            <!-- =========혁신========== -->
            <!-- ==========수정끝========= -->
          </table>
        </div>
      </div>

      <!-- 필터링 결과 X - 메시지 표시 -->
      <p v-if="filteredList.length === 0">표시할 내역이 없습니다.</p>

      <!-- 하단 '추가' 버튼 -->
      <div class="addButtonArea">
        <button class="addButton" @click="openPopup">추가 +</button>
      </div>

      <!-- 거래 추가 팝업 -->
      <PopupPage v-if="showPopup" @close="closePopup" />
      <!-- 거래 수정 팝업 제거: 수정은 라우터를 통해 TransactionEdit 페이지로 이동하므로 Popup 창을 사용하지 않습니다 -->
    </div>
  </div>
</template>

<style scoped>
.TransactionPage {
  background-color: var(--point-3-color);
}

/* '수입' 체크박스 */
#incomeCheck {
  background-color: var(--light-green);
  border-color: var(--point-1-color);
}

/* '수입/출금' 체크박스 선택 */
#incomeCheck:checked {
  background-color: var(--point-1-color);
  border-color: var(--point-1-color);
}

/* '출금' 체크박스 */
#expenseCheck {
  background-color: var(--light-red);
  border-color: var(--red-100);
}

/* '출금' 체크박스 선택 */
#expenseCheck:checked {
  background-color: var(--red-100);
  border-color: var(--red-100);
}

.delete_btn {
  background-color: aqua;
  display: flex;
  flex-direction: column;
}

.icon-hover:hover{
  transform: scale(1.2);
  transition: transform 0.2s ease;
}
</style>
