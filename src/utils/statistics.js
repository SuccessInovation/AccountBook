// 카테고리별 총합
<<<<<<< HEAD
export function calculateCategoryTotals(filteredRecords) {
  const result = {}
  filteredRecords.forEach(record => {
    if (record.type === '지출') {
=======
export function calculateCategoryTotals(filteredTransaction) {
  const result = {}
  filteredTransaction.forEach(record => {
    if (record.type === 'expense') {
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
      result[record.category] = (result[record.category] || 0) + record.amount
    }
  })
  return result
}

// 월별 총합
<<<<<<< HEAD
export function calculateMonthlyTotals(records, type) {
  const result = {}

  // records 전체의 월별 총합
  records.forEach(record => {
    if (record.type === type) {
      const month = record.date.slice(0, 7) // YYYY-MM 형식
      result[month] = (result[month] || 0) + record.amount
    }
  })

  // 최신 월 기준으로 8개월만 추리기
  const allMonths = Object.keys(result).sort() // Month 오름차순 정렬
  const lastEightMonths = allMonths.slice(-8) // 최신 월 포함 최근 8개월 추출

  const lastEightMonthsData = {}
  lastEightMonths.forEach(month => {
    lastEightMonthsData[month] = result[month]
=======
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

  // ✅ 선택한 월 기준으로 8개월 계산
  const lastEightMonths = []
  for (let i = 7; i >= 0; i--) {
    const date = new Date(selectedYear, selectedMonth, 1) // ✅ selectedMonth 그대로
    date.setMonth(date.getMonth() - i) // ✅ 안전하게 setMonth 사용
    const monthStr = date.toISOString().slice(0, 7)

    lastEightMonths.push(monthStr)
  }

  const lastEightMonthsData = {}
  lastEightMonths.forEach(month => {
    lastEightMonthsData[month] = result[month] || 0
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
  })

  return lastEightMonthsData
}

// 순이익
<<<<<<< HEAD
export function calculateNetProfit(filteredRecords) {
  let income = 0
  let expense = 0
  filteredRecords.forEach(record => {
    if (record.type === '수입') income += record.amount
    if (record.type === '지출') expense += record.amount
=======
export function calculateNetProfit(filteredTransaction) {
  let income = 0
  let expense = 0
  filteredTransaction.forEach(record => {
    if (record.type === 'income') income += record.amount
    if (record.type === 'expense') expense += record.amount
>>>>>>> f32031d89f4d3c574325098dc4fa57a074cf7677
  })
  return { income, expense, netProfit: income - expense }
}
