// 카테고리별 총합 계산
// - filteredTransaction에서 expense만 골라서 카테고리별로 금액 합산
export function calculateCategoryTotals(filteredTransaction) {
  const result = {}
  filteredTransaction.forEach(record => {
    if (record.type === 'expense') {
      result[record.category] = (result[record.category] || 0) + record.amount
    }
  })
  return result
}

// 월별 총합 계산
// - transactions(전체)에서 type('income' || 'expense')에 해당하는 거래를 년-월 별로 합산
// - 선택된 월 기준으로 최근 8개월 데이터 생성
export function calculateMonthlyTotals(
  transactions,
  type,
  selectedYear,
  selectedMonth,
) {
  const result = {}

  // type('income' || 'expense')의 월간 총합
  transactions.forEach(record => {
    if (record.type === type) {
      const recordDate = new Date(record.date)
      const recordYear = recordDate.getFullYear()
      const recordMonth = recordDate.getMonth()

      const key = `${recordYear}-${String(recordMonth + 1).padStart(2, '0')}`
      result[key] = (result[key] || 0) + record.amount
    }
  })

  // 선택한 월 기준 최근 8개월 배열 생성
  const lastEightMonths = []
  for (let i = 7; i >= 0; i--) {
    const date = new Date(selectedYear, selectedMonth, 1)
    date.setMonth(date.getMonth() - i)

    const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    lastEightMonths.push(monthStr)
  }

  // 8개월 데이터로 결과 객체 구성
  const lastEightMonthsData = {}
  lastEightMonths.forEach(month => {
    lastEightMonthsData[month] = result[month] || 0
  })

  return lastEightMonthsData
}

// 순이익 계산
// - filteredTransaction에서 income과 expense를 각각 합산
// - 순이익 = 수입 - 지출
export function calculateNetProfit(filteredTransaction) {
  let income = 0
  let expense = 0

  filteredTransaction.forEach(record => {
    if (record.type === 'income') income += record.amount
    if (record.type === 'expense') expense += record.amount
  })

  return { income, expense, netProfit: income - expense }
}
