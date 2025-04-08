// 선택된 월의 지출 데이터만
export function calculateCategoryTotalsForMonth(transactions, selectedMonth) {
    const result = {}
  
    transactions.forEach(tx => {
      const month = tx.date.slice(0, 7)
      if (tx.type === '지출' && month === selectedMonth) {
        result[tx.category] = (result[tx.category] || 0) + tx.amount
      }
    })
  
    return result
  }
  
  // 월별 총합
  export function calculateMonthlyExpensesForLastMonths(
    transactions,
    selectedMonth,
    range = 7,
  ) {
    const result = {}
    const targetDate = new Date(selectedMonth + '-01')
  
    for (let i = range; i >= 0; i--) {
      const date = new Date(targetDate)
      date.setMonth(date.getMonth() - i)
      const monthKey = date.toISOString().slice(0, 7)
      result[monthKey] = 0
    }
  
    transactions.forEach(tx => {
      const month = tx.date.slice(0, 7)
      if (tx.type === '지출' && result.hasOwnProperty(month)) {
        result[month] += tx.amount
      }
    })
  
    return result
  }
  
  // 순이익
  export function calculateNetProfitForMonth(transactions, selectedMonth) {
    let income = 0
    let expense = 0
  
    transactions.forEach(tx => {
      const month = tx.date.slice(0, 7)
      if (month === selectedMonth) {
        if (tx.type === '수입') income += tx.amount
        if (tx.type === '지출') expense += tx.amount
      }
    })
  
    return { income, expense, netProfit: income - expense }
  }
  