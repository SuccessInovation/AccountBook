/** #region 월 선택 함수
 *
 *
 *
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const use_calendar_store = defineStore('calendar', () => {
  // 월 이름을 숫자(index)로부터 가져오기 위한 배열
  // index 0 → January, index 11 → December
  const month_names = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  //  현재 날짜 기준으로 초기값 설정
  const base_date = new Date()

  //  current_year: 현재 보고 있는 연도를 저장하는 반응형 변수
  //    - ref를 사용하여 반응형으로 상태를 추적함
  const current_year = ref(base_date.getFullYear())

  //  current_month: 현재 보고 있는 월 (0~11)
  //    - base_date에서 getMonth()는 0부터 시작하므로 그대로 사용
  const current_month = ref(base_date.getMonth())

  //  get_month_data: offset을 받아서 해당 월/연 정보를 반환하는 함수
  //    - offset은 -1, 0, 1 (이전 달, 현재 달, 다음 달)
  //    - new Date는 자동으로 월이 12 이상이면 다음 해로, 0보다 작으면 이전 해로 계산됨
  function get_month_data(offset) {
    const date = new Date(current_year.value, current_month.value + offset)
    return {
      year: date.getFullYear(), // 계산된 연도
      month: date.getMonth(), // 계산된 월 (0~11)
    }
  }

  //  visible_months: 화면에 보여줄 3개월 데이터 (이전/현재/다음 달)
  //    - computed로 자동 갱신되며, 배열로 렌더링됨
  const visible_months = computed(() => [
    get_month_data(-1), // 이전 달
    get_month_data(0), // 현재 달
    get_month_data(1), // 다음 달
  ])

  //  이전 달로 이동하는 함수
  //    - 월이 0 (1월)일 경우, 연도를 -1 하고 12월로 설정
  //    - 아니면 단순히 -1
  function go_to_prev_month() {
    if (current_month.value === 0) {
      current_month.value = 11
      current_year.value--
    } else {
      current_month.value--
    }
  }

  //  다음 달로 이동하는 함수
  //    - 월이 11 (12월)일 경우, 연도를 +1 하고 1월로 설정
  //    - 아니면 단순히 +1
  function go_to_next_month() {
    if (current_month.value === 11) {
      current_month.value = 0
      current_year.value++
    } else {
      current_month.value++
    }
  }

  // 스토어에서 사용할 항목들 반환
  return {
    current_year,
    current_month,
    month_names,
    visible_months,
    go_to_prev_month,
    go_to_next_month,
  }
})
