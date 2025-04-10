# BaeChu

안녕하세요, 온라인 가계부 서비스 "배추"입니다.
다같이 배춧잎을 지갑에 넣어볼까요?

---

## Contents

- Introduction
- Role Management
- Process
- Result
- Discussion
- Communications

---

## Introduction

**Vue.js**를 이용하여 **온라인 가계부 웹 서비스**를 제작합니다.

---

### 목적

- 수업시간에 배운 기술 요소를 실제 서비스에 접목해 봄으로써 각 개인의 프로그래밍 능력 향상
- 서비스 개발 과정 중 기획, 설계, 코딩, 테스트, 배포의 각 단계를 경험
- 팀 프로젝트 진행 시 협력 및 충돌 경험으로써 의사소통 능력 향상

---

### 목표

- Component를 이용한 기능 별 구조 분리
- Router를 활용한 라우트 이동
- Axios를 활용한 백엔드 서버(Json-server로 대체) 접근
- 반응형 웹 구현
- 실제 동작하는 서비스 구현

---

### 사용 기술

<img src="https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white">
<img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">

---

### 사용 툴

<img src="https://img.shields.io/badge/Visual Studio Code-2F80ED?style=for-the-badge&logo=Visual Studio Code&logoColor=white">
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

---

### 기간

- **2025-04-07 (월) ~ 2025-04-11 (금)**

---

## Role Management

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/Hyukman818"><img src="https://github.com/Hyukman818.png" width="100px;" alt=""/><br /><sub><b>팀장 : 오혁신 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/jungsunwoong"><img src="https://github.com/jungsunwoong.png" width="100px;" alt=""/><br /><sub><b>부팀장 : 정선웅 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/saeun-park"><img src="https://github.com/saeun-park.png" width="100px;" alt=""/><br /><sub><b>팀원 : 박사은 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/maedachaeva"><img src="https://github.com/maedachaeva.png" width="100px;" alt=""/><br /><sub><b>팀원 : 박채연 </b></sub></a><br /></td>
     <tr/>
      <td align="center"><a href="https://github.com/woojeans7"><img src="https://github.com/woojeans7.png" width="100px;" alt=""/><br /><sub><b>팀원 : 송우진 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/yurissssss"><img src="https://github.com/yurissssss.png" width="100px;" alt=""/><br /><sub><b>팀원 : 신유리 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/lolddong"><img src="https://github.com/lolddong.png" width="100px;" alt=""/><br /><sub><b>팀원 : 안다윤</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/kthrc"><img src="https://github.com/kthrc.png" width="100px;" alt=""/><br /><sub><b>팀원 : 최유정</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

---

## 역할 상세

> ### 박사은

**1. 기능**

- 상세 구현

> ### 박채연

**1. 기능**

- 상세 구현

> ### 송우진

**1. 기능**

- 상세 구현

> ### 신유리
> 
 ** 1. 카테고리 파일
 * '수입/지출' 카테고리 배열로 저장
 * 카테고리명 '영어-한글' 매핑
 *
 **2. API 주소 파일
 * API 주소를 변수로 받아오기 위한 파일 저장
 * 수입/지출 체크박스 선택에 따라 거래내역 필터링
 *
 ** 3. 카테고리 필터
 * 수입/지출 체크박스 선택에 따라 거래내역 필터링
 * 선택된 체크박스 유형에 따른 카테고리 항목 설정 ( 입금: 급여, 용돈, … / 지출: 식비, 카페간식, …)
 * 선택된 카테고리에 맞는 거래내역 모두 표시
 * 외부영역 클릭시 드롭다운 메뉴 닫힘     
 * 선택된 카테고리  필터에 보여짐
 *
 **4. 메모 검색
 * 지출 / 수입 체크박스 선택에 따른 거래내역 출력
 * 입력받은 메모와 일치하는 메모값을 갖는 카테고리에 맞는 거래내역 모두 표시
 *
 **5. 부트스트랩 이용
 * 카테고리 필터
 * 메모 검색
 * 수입/지출 선택 박스
 * 거래내역 (나열된 리스트)
 *
 **6. 코드 정리 & 주석
 * FilterCategory.vue
 * SearchByMemo.vue
 * TransactionContent.vue
 *
 * 
 */
// #endregion

> ### 안다윤

**1. 기능**

- 상세 구현

> ### 오혁신

**1. 기능**
1. 거래 등록
- 거래 정보(체크박스, 날짜, 카테고리, 메모, 금액) 입력 후 db.json에 내역 저장
  - 등록 후 새로고침 없이 최신 내역이 추가 되도록 구현
  - 예외처리를 통해 미(오)입력 시 '금액은 0원보다 커야 합니다', '필수 항목입니다' 메시지 출력
2. 거래 내역
- 전체 거래 내역 출력
  - db에 저장한 정보를 categories.js 에서 mapping을 통해 사용자가 이해하기 쉬운 value 값으로 출력
- 수정/삭제 기능
  - 수정 : id 값을 불러와서 해당 id의 데이터 정보를 불러와서 수정
  - 삭제 : id 값의 데이터를 삭제하도록 구현
    - 위 항목들에 대한 예외 처리는 등록 시와 동일

> ### 정선웅

**1. 기능**

- 상세 구현

> ### 최유정

**1. 기능**

- 상세 구현

---

## Process

## Process

- 📅 **월별 거래 관리**: 날짜별로 수입/지출 내역 등록 및 조회
- 💸 **예산 설정 및 진척도 시각화**: 카테고리별 예산 설정과 퍼센트 게이지
- 📊 **통계 분석**: 월간 수입/지출 통계, 파이 차트로 시각화
- 🔍 **카테고리별 정리**: 식비, 교통비 등 카테고리 기반 필터링
- 📂 **데이터 저장**: json-server 기반 로컬 DB 사용

---

### 1일차

> - 기능 기획
> - 스토리보드 작성
> - 전체 레이아웃 스케치 작성
> - 역할 분담

### 2일차

> - figma 전체 레이아웃 UI/UX 작성
> - 스토리보드 완성
> - 기능 구현

### 3일차

> - 기능 구현

### 4일차

> - 기능 구현 완성
> - 디자인 작업
> - 기능 병합

### 5일차

> - 발표

---

## Result

---

## Discussion

---

## Communication

### Naming Convetion

- 컴포넌트 파일명: PascalCase (ex. `TransactionForm.vue`, `ExpenseList.vue`)
- 비 컴포넌트 파일: camelCase (ex. `api.js`, `useTransaction.js`)
- 폴더명: 소문자 복수형 (`components`, `pages`, `layout`)
- CSS 클래스명 : snake_case(`popup_layer`)

기타:

- export name, 파일명, 컴포넌트명 일치
- 컴포넌트명은 역할 + 접미사로 2단어 이상 사용 (ex. `List.vue` ❌ → `ExpenseList.vue` ✅)

---

### Comment Convention

**CSS 주석**

````시작만 표기 (끝X)
/* 헤더 레이아웃 시작 */
~~ 스타일시트 작성 ~~~```
````

---

**Script 주석**

```
// #region 함수 기능
/**
* 함수 내용 요약
 * 변수 설명
 * return 값 설명
 */
 ~~~ 스크립트 작성 ~~~
// endregion
```

---

### 📌 Git 협업 전략

> 원활한 협업을 위한 브랜치 동기화 및 병합 전략
>
> - 꼭 로컬-원격 간 최신화 업데이트를 진행하고 코드를 수정해주세요!!!
> - 개발은 dev 브랜치에서만!
> - feature 별로 각 기능 작업

1. **로컬 `feature` → 원격 `feature` 최신화**
2. **원격 `dev` → 로컬 `dev` 최신화**
3. **로컬 `dev` → 로컬 `feature` 병합 (충돌 여부 확인)**
4. **병합 및 충돌 해결 후 → 원격 `feature`에 반영**
5. **최종적으로 원격 `dev`에 PR 생성**
6. **PR approve 후 `dev`에 병합**

---

### 📌 Commit Message

**형식**: `키워드: 커밋 메시지 내용 04-07(날짜)`

예시:

- `Fix: 회원가입 시 비밀번호 정규식 오류 해결`

| 키워드       | 설명                       |
| ------------ | -------------------------- |
| **Feat**     | 새로운 기능 추가           |
| **Fix**      | 버그 수정                  |
| **Refactor** | 코드 리팩토링              |
| **Design**   | CSS 등 UI/UX 디자인 변경   |
| **Comment**  | 주석 추가/수정             |
| **Docs**     | 문서 관련 작업 (README 등) |
| **Init**     | 초기 설정 및 구성          |
| **Edit**     | 기능 수정 및 편집          |
| **Rename**   | 파일/폴더명 변경           |
| **Remove**   | 파일 삭제                  |
| **Merge**    | 브랜치 병합                |

---

### 📌 Branch

**형식**: `feature/{issue-number}-{feature-name}`

예시:

- `feature/1-init-project`
- `feature/2-main-layout`

이슈번호 관리 : 각 페이지별로 이슈번호 등록, 하위 컴포넌트 작업도 공통 이슈번호로 통일

- Home - 1-home
- 수입/지출 관리 - 2-transaction
- 통계 - 3-statistics
- 예산 관리 - 4-budget
- 레이아웃 - 5-layout

---

### 📌 Pull Request Template

```
### [#이슈번호] 기능 구현 제목

## 개요
- 무엇을, 왜 수정했는지 설명해주세요.

## PR 유형
- [ ] 새로운 기능 추가
- [ ] 버그 수정
- [ ] CSS 등 사용자 UI 디자인 변경
- [ ] 코드 리팩토링
- [ ] 코드에 영향 없는 수정
- [ ] 문서 수정
- [ ] 테스트 추가/리팩토링
- [ ] 빌드/패키지 관련
- [ ] 파일/폴더명 수정
- [ ] 파일 삭제

## PR Checklist
- [ ] 커밋 메시지 컨벤션을 지켰나요?
- [ ] 기능 테스트를 완료했나요?
- [ ] develop 브랜치로 머지 요청했나요?
```

---

### 📌 Label

```
- name: '🐛 bugfix'
  color: 'd73a4a'
  description: '버그 픽스'

- name: '✨ feature'
  color: '0E8A16'
  description: '새로운 기능 추가'

- name: '🔁 refactor'
  color: 'c2e0c6'
  description: '리팩토링 작업'

- name: '📄 documentation'
  color: '0075ca'
  description: '문서 관련 작업'

- name: '💬 question'
  color: 'd876e3'
  description: '논의/질문'

- name: '🎨 design'
  color: 'ffb3c6'
  description: 'UI/UX 관련 작업'

- name: '🧪 test'
  color: 'f9d0c4'
  description: '테스트 코드 또는 테스트 관련 작업'
```

---

```

```
