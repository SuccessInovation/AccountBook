// 카테고리별 총합
export function calculateCategoryTotals(filteredRecords) {
  const result = {}
  filteredRecords.forEach(record => {
    if (record.type === '지출') {
      result[record.category] = (result[record.category] || 0) + record.amount
    }
  })
  return result
}

// 월별 총합
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
  // const allMonths = Object.keys(result).sort() // Month 오름차순 정렬
  // const lastEightMonths = allMonths.slice(-8) // 최신 월 포함 최근 8개월 추출

  const today = new Date()
  const lastEightMonths = []

  for (let i = 7; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
    const monthStr = date.toISOString().slice(0, 7)
    lastEightMonths.push(monthStr)
  }

  const lastEightMonthsData = {}
  lastEightMonths.forEach(month => {
    lastEightMonthsData[month] = result[month] || 0
  })

  return lastEightMonthsData
}

// 순이익
export function calculateNetProfit(filteredRecords) {
  let income = 0
  let expense = 0
  filteredRecords.forEach(record => {
    if (record.type === '수입') income += record.amount
    if (record.type === '지출') expense += record.amount
  })
  return { income, expense, netProfit: income - expense }
}
