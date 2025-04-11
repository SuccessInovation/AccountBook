// 카테고리별 총합
export function calculateCategoryTotals(filteredTransaction) {
  const result = {}
  filteredTransaction.forEach(record => {
    if (record.type === 'expense') {
      result[record.category] = (result[record.category] || 0) + record.amount
    }
  })
  return result
}

// 월별 총합
export function calculateMonthlyTotals(
  transactions,
  type,
  selectedYear,
  selectedMonth,
) {
  const result = {}
  // transactions 전체의 월별 총합
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

  const lastEightMonthsData = {}
  lastEightMonths.forEach(month => {
    lastEightMonthsData[month] = result[month] || 0
  })

  return lastEightMonthsData
}

// 순이익
export function calculateNetProfit(filteredTransaction) {
  let income = 0
  let expense = 0
  filteredTransaction.forEach(record => {
    if (record.type === 'income') income += record.amount
    if (record.type === 'expense') expense += record.amount
  })
  return { income, expense, netProfit: income - expense }
}
