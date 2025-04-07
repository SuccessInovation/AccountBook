# AccountBook

온라인 가계부 프로젝트

## 🛠 Git & 협업 컨벤션

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
| **Rename**   | 파일/폴더명 변경           |
| **Remove**   | 파일 삭제                  |

---

### 📌 Branch

**형식**: `feature/{issue-number}-{feature-name}`

예시:

- `feature/1-init-project`
- `feature/2-main-layout`

이슈번호 관리 : 각 페이지별로 이슈번호 등록, 하위 컴포넌트 작업도 공통 이슈번호로 통일

- Home - 1
- 수입/지출 관리 - 2
- 통계 - 3
- 예산 관리 - 4

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
