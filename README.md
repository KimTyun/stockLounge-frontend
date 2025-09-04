# StockRounge - 코인 커뮤니티 플랫폼

코인 종목토론 게시판 커뮤니티형 핀테크 반응형 웹사이트

## 📌 Git 협업 규칙

팀 프로젝트에서 원활한 협업을 위해 다음과 같은 Git 규칙을 따릅니다.

---

### 🔹 Commit 규칙
1. **작업 단위별로 Commit**  
   - 기능/버그 수정 단위로 Commit (너무 자주/너무 드물게 ❌)  
   - 한 가지 작업이 끝나면 Commit  

   ✅ 올바른 예시  
   - `feat: 로그인 페이지 구현`  
   ❌ 잘못된 예시  
   - `feat: 로그인, 회원가입, 내정보수정`  
   - `feat: handleLogin 함수 생성`  

2. **Commit 메세지 작성 규칙**  
   - 형식: **`[type]: message`**  
   - type은 아래 중 선택:
     - `feat` : 기능 추가  
     - `fix` : 버그 수정  
     - `refactor` : 코드 리팩토링  
     - `test` : 테스트 코드 추가 (로직 변경 없음)  
     - `build` : 빌드 관련 수정  
     - `chore` : 기타 변경  
     - `ing` : 작업 중 중간 저장 (`ing: [type], message`)  

   📍 예시  
   - `feat: 회원 가입 기능 추가`  
   - `fix: swiper 기능 오류 개선`  
   - `ing: feat, 로그인 로직 구현중`  

---

### 🔹 PR 규칙
1. 충돌 발생 시 → **무조건 반려** (작성자가 직접 해결 후 다시 PR)  
2. **main 브랜치 직접 merge 금지**  
3. PR은 **최소 1명 이상의 Reviewer** 승인 필요  
   - 리뷰 시 이해 안 되는 부분 질문하기  
   - 로직 및 코드 품질 확인하기  

---

### 🔹 Branch 네이밍 규칙
- 형식: **`[이니셜]/작업내용`**  
  - 이니셜: 동빈(DB), 택윤(TY), 인덕(ID), 태민(TM)  
  - 작업내용: 간단하게, WBS 기준 작성  

📍 예시  
- `TY/login-page`  
- `DB/chart-api`  

> 완료된 브랜치는 제거 후, 새로운 작업 시 새 브랜치 생성.  

---

### 🔹 기타 협업 규칙
1. **AI 코드 사용**  
   - AI 코드 그대로 복붙 ❌  
   - 필요한 부분만 이해 후 적용 ✔  
   - 코드 통일성 유지, AI 오류(Hallucination) 주의  

2. **팀원 코드 수정 금지**  
   - 다른 팀원 함수 활용 ✔  
   - 공용 파일(`api.js`, `app.js` 등)에 코드 추가 ⚠  
   - 타인의 코드 임의 수정/삭제 ❌ (수정 필요 시 작성자에게 알리고 협의 후 진행)  

3. **문제 공유하기**  
   - 반나절 이상 해결 안 되는 문제는 팀원과 공유  
   - 함께 논의하여 해결책 모색  

---



## 🚀 주요 기능

### 메인 페이지

-  **GNB (고정 상단바)**: 로그인/회원가입, 주요 메뉴 [메인/게시판/차트/뉴스/내정보]
-  **코인 차트 영역**: 주요 3개 코인 (비트코인/이더리움/리플) 캔들 차트
-  **인기 게시글 영역**: 오늘의 인기글 3개 카드 형태
-  **뉴스 영역**: 코인뉴스/경제뉴스 2개 블록

### 인증 시스템

-  **소셜 로그인**: 구글, 카카오 OAuth 인증
-  **포인트 시스템**: 게시글/댓글 작성, 추천 시 포인트 지급
-  **포인트 교환**: 1000포인트 = 1코인, 실제 상품 교환 가능

### 게시판

-  **코인별 게시판**: 선택한 코인의 차트와 관련 게시글
-  **React-Quill 에디터**: 풍부한 텍스트 편집 기능
-  **댓글 시스템**: 추천/신고 기능 포함

### 차트

-  **실시간 차트**: Upbit API 연동
-  **다양한 시간단위**: 일간/주간/월간/년간
-  **TOP 코인**: 상위 20개 코인 리스트

### 관리자

-  **대시보드**: 통합 관리 화면
-  **유저관리**: 사용자 목록, 제재 관리
-  **게시판관리**: 게시글 관리, 삭제 기능
-  **통계**: 방문자수, 가입자수, 포인트 발행 추이

## 🛠 기술 스택

-  **Frontend**: React 19, Vite
-  **UI Framework**: Bootstrap 4, React-Bootstrap
-  **상태관리**: Redux Toolkit
-  **라우팅**: React Router DOM
-  **차트**: Chart.js, React-ChartJS-2
-  **에디터**: React-Quill
-  **API**: Axios
-  **스타일링**: CSS Modules

## 🎨 디자인 시스템

-  **메인 컬러**: #5E94CA (Primary), #F7FAFC (Secondary)
-  **소셜 로그인 컬러**:
   -  구글: #4285F4
   -  카카오: #FAD900
-  **반응형 디자인**: Bootstrap 4 기반

## 📂 폴더 구조

```
src/
├── components/           # 재사용 가능한 UI 컴포넌트
│   ├── common/          # 공통 컴포넌트 (Header, Footer, Layout 등)
│   ├── auth/            # 인증 관련 컴포넌트
│   ├── chart/           # 차트 관련 컴포넌트
│   ├── board/           # 게시판 관련 컴포넌트
│   ├── news/            # 뉴스 관련 컴포넌트
│   ├── user/            # 사용자 관련 컴포넌트
│   └── admin/           # 관리자 관련 컴포넌트
├── pages/               # 페이지 컴포넌트
├── hooks/               # 커스텀 훅
├── services/            # API 서비스
├── features/            # Redux 상태 관리
├── utils/               # 유틸리티 함수
├── styles/              # 스타일 파일
├── assets/              # 정적 자원
└── config/              # 설정 파일
```

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 http://localhost:5173 에서 실행됩니다.

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 🔧 환경 변수

`.env` 파일을 생성하고 다음 환경 변수들을 설정하세요:

```env
# API 설정
REACT_APP_API_BASE_URL=http://localhost:3001/api

# Upbit API
REACT_APP_UPBIT_ACCESS_KEY=your_access_key
REACT_APP_UPBIT_SECRET_KEY=your_secret_key

# 소셜 로그인
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_KAKAO_CLIENT_ID=your_kakao_client_id
```

## 📱 반응형 지원

-  **Mobile**: 576px 미만
-  **Tablet**: 576px - 768px
-  **Desktop**: 768px 이상

## 🔗 API 연동

-  **Upbit API**: 실시간 코인 데이터
-  **네이버 뉴스 API**: 경제/코인 뉴스
-  **자체 백엔드 API**: 사용자, 게시판, 포인트 관리

## 📋 개발 진행 상황

-  [x] 프로젝트 초기 설정
-  [x] 폴더 구조 생성
-  [x] 기본 컴포넌트 (Header, Footer, Layout)
-  [x] 홈페이지 기본 구조
-  [x] 로그인 모달 및 소셜 로그인 UI
-  [x] 차트 컴포넌트 기본 구조
-  [x] 게시글 카드 컴포넌트
-  [ ] API 연동
-  [ ] 상태관리 구현
-  [ ] 나머지 페이지 구현
-  [ ] 백엔드 연동

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이센스

This project is licensed under the MIT License.

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.+ Vite
