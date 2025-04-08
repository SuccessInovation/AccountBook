// 카테고리 목록 배열로 저장
// 카테고리 -> 상수 -> 대문자로 명명

// 지출
export const EXPENSE_CATEGORIES = [
  'Food',
  'CafeSnack',
  'Entertainment',
  'Shopping',
  'Transportation',
  'Utilities',
  'Health',
  'Leisure',
  'Travel',
  'Contributions',
  'Savings',
  'Education',
  'etc',
]

// 수입
export const INCOME_CATEGORIES = [
  'Salary',
  'Allowance',
  'Financial',
  'Scholarship',
  'etc',
]

// 카테고리 이름 한글-영어 매칭
export const CATEGORY_MAP = {
  // 지출
  Food: '식비',
  CafeSnack: '카페/간식',
  Entertainment: '술/유흥',
  Shopping: '쇼핑',
  Transportation: '교통',
  Utilities: '주거/통신',
  Health: '의료/건강',
  Leisure: '문화/여가',
  Travel: '여행/숙박',
  Contributions: '경조사/회비',
  Savings: '저축',
  Education: '교육',
  etc: '기타',

  // 수입
  Salary: '급여',
  Allowance: '용돈',
  Financial: '금융수입',
  Scholarship: '장학금',
}
