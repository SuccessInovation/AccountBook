<script setup>
/*
  이 컴포넌트는 거래 내역 목록을 보여줍니다.
  Props:
    - transactions: 거래 내역 배열
  Emits:
    - edit: 수정 요청 시 거래 전체 데이터를 전달
    - delete: 삭제 요청 시 거래의 id를 전달
*/


const emit = defineEmits(['edit', 'delete'])

// 금액 포맷 함수: 거래 유형에 따라 수입은 '+' 지출은 '-' 부호 추가
function formattedAmount(value, type) {
  const num = parseFloat(value)
  if (isNaN(num)) return value
  const formatted = num.toLocaleString()
  return type === '수입'
    ? `+${formatted}`
    : type === '지출'
      ? `-${formatted}`
      : formatted
}

function emitEdit(record) {
  emit('edit', record)
}

function emitDelete(id) {
  emit('delete', id)
}
</script>

<template>
  <div class="transaction-content">
    <table class="ledger-table">
      <thead>
        <tr>
          <!-- 선택삭제용 체크박스 열 -->
          <th style="width: 40px"><input type="checkbox" /></th>
          <th style="width: 120px">날짜</th>
          <th style="width: 120px">카테고리</th>
          <th>내용</th>
          <th style="width: 120px">금액</th>
          <th style="width: 60px">수정</th>
          <th style="width: 60px">삭제</th>
        </tr>
      </thead>
      <tbody>
        <!-- props로 받은 transactions 배열을 v-for로 반복 -->
        <tr v-for="record in transactions" :key="record.id">
          <!-- 선택 삭제용 체크박스 (추후 선택 삭제 기능에 활용) -->
          <td>
            <input type="checkbox" v-model="record.selected" />
          </td>
          <td>{{ record.date }}</td>
          <td>{{ record.category }}</td>
          <td>{{ record.description }}</td>
          <td>{{ formattedAmount(record.amount, record.type) }}</td>
          <!-- 수정 아이콘: 클릭 시 edit 이벤트 emit -->
          <!-- 구현 X -->
          <td>
            <i
              class="icon-edit"
              @click="emitEdit(record)"
              style="cursor: pointer"
              >✏️</i
            >
          </td>
          <!-- 삭제 아이콘: 클릭 시 delete 이벤트 emit -->
          <td>
            <i
              class="icon-delete"
              @click="emitDelete(record.id)"
              style="cursor: pointer"
              >🗑️</i
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.ledger-table {
  width: 100%;
  border-collapse: collapse;
}
.ledger-table th,
.ledger-table td {
  padding: 12px;
  border-bottom: 1px solid #eee;
  text-align: left;
}
</style>
