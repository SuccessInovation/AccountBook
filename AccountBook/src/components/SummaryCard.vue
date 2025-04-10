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
  border: 30px solid var(--point-3-color);
  border-radius: 20px;
  background-color: var(--point-3-color);
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
  width: 40%;
  height: 600px;
  border: 30px solid var(--point-3-color);
  border-radius: 20px;
}
</style>
