<<<<<<< HEAD
<script setup></script>

<template>
  <div class="summary_card">
    <div class="card_wrap">
      <div class="expense_card card_box">
        <div class="box_title"><span>지출</span></div>
        <div id="usevalue_expense" class="amount_box">1,500,000 원</div>
      </div>
      <div class="income_card card_box">
        <div class="box_title"><span>수입</span></div>
        <div id="usevalue_income_box" class="amount_box">8,500,000 원</div>
      </div>
      <div class="budget_card card_box">
        <div class="box_title"><span>예산</span></div>
        <div id="usevalue_budget_box" class="amount_box">7,000,000 원</div>
      </div>
    </div>
    <div class="piechart_wrap"></div>
=======
<!-- summary_card	전체 카드 섹션을 감싸는 최상위 div
card_wrap	        왼쪽 카드 묶음 (지출/수입/예산 카드 포함)
card_box	        각 개별 카드 박스 스타일 클래스
amount_box	      금액을 표시하는 곳
piechart_wrap	    향후 파이차트를 넣을 오른쪽 공간 -->
<script setup>
// 파이차트 가져오기
// import MonthlyPieChart from '@/components/MonthlyPieChart.vue'

// props로 부모 컴포넌트로부터 세 가지 숫자 데이터를 받음
const props = defineProps({
  totalExpense: Number, // 총 지출
  totalIncome: Number, // 총 수입
  budget: { Number, default: 0 }, // 예산
  monthlyData: Object, // 카테고리별 지출 데이터 추가
})

console.log('받은 props:', props)
</script>

<template>
  <div class="summary_card">
    <!-- 왼쪽 카드 영역 -->
    <div class="card_wrap">
      <!-- 지출 카드 -->
      <div class="expense_card card_box">
        <div class="box_title"><span>지출</span></div>
        <div id="usevalue_expense" class="amount_box">
          {{ (totalExpense ?? 0).toLocaleString() }} 원
          <!-- 숫자를 한국식 쉼표 포맷으로 변환: 1500000 -> 1,500,000 -->
        </div>
      </div>

      <!-- 수입 카드 -->
      <div class="income_card card_box">
        <div class="box_title"><span>수입</span></div>
        <div id="usevalue_income_box" class="amount_box">
          <p>{{ isNaN(totalIncome) ? 0 : totalIncome.toLocaleString() }}원</p>
        </div>
      </div>

      <!-- 예산 카드 -->
      <div class="budget_card card_box">
        <div class="box_title"><span>예산</span></div>
        <div id="usevalue_budget_box" class="amount_box">
          {{ (budget ?? 0).toLocaleString() }} 원
        </div>
      </div>
    </div>

    <!-- 오른쪽 파이차트 자리 (현재 비워져 있음) -->
    <div class="piechart_wrap">
      <!-- <MonthlyPieChart :monthly-data="monthlyData" /> -->
    </div>
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
  </div>
</template>

<style scoped>
/* 요약 카드 스타일 */
.summary_card {
  margin-top: 5rem;
  padding: 0;
  width: 100%;
  font-size: 2rem;
  color: #3f3e3c;
  display: flex;
  justify-content: center;
  gap: 5rem;
}
/* 왼쪽 카드 */
.card_wrap {
  width: 40%;
  height: 600px;
<<<<<<< HEAD
  border: 30px solid var(--point-3-color);
  border-radius: 20px;
  background-color: var(--point-3-color);
=======
  border: 30px solid var(--color-point-3);
  border-radius: 20px;
  background-color: var(--color-point-3);
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  justify-content: space-between;
  text-align: center;
  gap: 3rem;
}

.card_box {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 200px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  font-weight: 900;
}
.box_title {
  width: 30%;
}

.amount_box {
  width: 60%;
  /* border: 1px solid black; */
  height: 100px;
  align-content: center;
}

/* 오른쪽 파이차트 */
.piechart_wrap {
<<<<<<< HEAD
  width: 40%;
  height: 600px;
  border: 30px solid var(--point-3-color);
  border-radius: 20px;
=======
  width: 60%;
  height: 1000px;
  border: 30px solid var(--color-point-3);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
}
</style>
