// 라우트 경로 정의
export const ROUTES = {
  // 공통 페이지
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  
  // 게시판
  BOARD: '/board',
  BOARD_DETAIL: '/board/:id',
  BOARD_WRITE: '/board/write',
  BOARD_EDIT: '/board/:id/edit',
  
  // 차트
  CHART: '/chart',
  CHART_COIN: '/chart/:symbol',
  
  // 뉴스
  NEWS: '/news',
  NEWS_DETAIL: '/news/:id',
  
  // 사용자
  USER_INFO: '/user',
  USER_EDIT: '/user/edit',
  USER_POINTS: '/user/points',
  USER_POINT_EXCHANGE: '/user/points/exchange',
  USER_POINT_HISTORY: '/user/points/history',
  
  // 관리자
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_USERS_DETAIL: '/admin/users/:id',
  ADMIN_BOARDS: '/admin/boards',
  ADMIN_BOARDS_DETAIL: '/admin/boards/:id',
  ADMIN_STATISTICS: '/admin/statistics',
  ADMIN_SITE: '/admin/site',
  
  // 오류 페이지
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500'
};

// 네비게이션 메뉴
export const NAV_ITEMS = [
  {
    path: ROUTES.HOME,
    label: '메인',
    icon: '🏠',
    public: true
  },
  {
    path: ROUTES.BOARD,
    label: '게시판',
    icon: '📝',
    public: true
  },
  {
    path: ROUTES.CHART,
    label: '차트',
    icon: '📈',
    public: true
  },
  {
    path: ROUTES.NEWS,
    label: '뉴스',
    icon: '📰',
    public: true
  },
  {
    path: ROUTES.USER_INFO,
    label: '내정보',
    icon: '👤',
    public: false
  }
];

// 관리자 사이드바 메뉴
export const ADMIN_NAV_ITEMS = [
  {
    path: ROUTES.ADMIN_DASHBOARD,
    label: '대시보드',
    icon: '📊'
  },
  {
    path: ROUTES.ADMIN_USERS,
    label: '유저관리',
    icon: '👥'
  },
  {
    path: ROUTES.ADMIN_BOARDS,
    label: '게시판관리',
    icon: '📋'
  },
  {
    path: ROUTES.ADMIN_STATISTICS,
    label: '통계',
    icon: '📈'
  },
  {
    path: ROUTES.ADMIN_SITE,
    label: '사이트관리',
    icon: '⚙️'
  }
];

// 보호된 라우트 (로그인 필요)
export const PROTECTED_ROUTES = [
  ROUTES.BOARD_WRITE,
  ROUTES.BOARD_EDIT,
  ROUTES.USER_INFO,
  ROUTES.USER_EDIT,
  ROUTES.USER_POINTS,
  ROUTES.USER_POINT_EXCHANGE,
  ROUTES.USER_POINT_HISTORY
];

// 관리자 전용 라우트
export const ADMIN_ROUTES = [
  ROUTES.ADMIN,
  ROUTES.ADMIN_DASHBOARD,
  ROUTES.ADMIN_USERS,
  ROUTES.ADMIN_USERS_DETAIL,
  ROUTES.ADMIN_BOARDS,
  ROUTES.ADMIN_BOARDS_DETAIL,
  ROUTES.ADMIN_STATISTICS,
  ROUTES.ADMIN_SITE
];

// 페이지 타이틀 매핑
export const PAGE_TITLES = {
  [ROUTES.HOME]: '코잘알 - 코인 커뮤니티',
  [ROUTES.LOGIN]: '로그인 - 코잘알',
  [ROUTES.REGISTER]: '회원가입 - 코잘알',
  [ROUTES.BOARD]: '게시판 - 코잘알',
  [ROUTES.BOARD_WRITE]: '게시글 작성 - 코잘알',
  [ROUTES.CHART]: '차트 - 코잘알',
  [ROUTES.NEWS]: '뉴스 - 코잘알',
  [ROUTES.USER_INFO]: '내정보 - 코잘알',
  [ROUTES.USER_EDIT]: '정보수정 - 코잘알',
  [ROUTES.USER_POINTS]: '포인트 - 코잘알',
  [ROUTES.ADMIN_DASHBOARD]: '관리자 대시보드 - 코잘알'
};
