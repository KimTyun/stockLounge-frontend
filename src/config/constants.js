// API 기본 설정
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

// Upbit API 설정
export const UPBIT_API = {
  BASE_URL: 'https://api.upbit.com/v1',
  ACCESS_KEY: process.env.REACT_APP_UPBIT_ACCESS_KEY || 'PvLr4WBQY7Pehn1CULQ6nBM2y5qN9K3u9Hi8zXj7',
  SECRET_KEY: process.env.REACT_APP_UPBIT_SECRET_KEY || 'knetB2oJ3zjEFchcqGYzheceyjph7K5wNi22SQe2',
  WEBSOCKET_URL: 'wss://api.upbit.com/websocket/v1'
};

// 소셜 로그인 설정
export const SOCIAL_LOGIN = {
  GOOGLE: {
    CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
    REDIRECT_URI: process.env.REACT_APP_GOOGLE_REDIRECT_URI || ''
  },
  KAKAO: {
    CLIENT_ID: process.env.REACT_APP_KAKAO_CLIENT_ID || '',
    REDIRECT_URI: process.env.REACT_APP_KAKAO_REDIRECT_URI || ''
  }
};

// 페이지네이션 설정
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50
};

// 포인트 시스템 설정
export const POINTS = {
  POST_CREATE: 10,      // 게시글 작성
  COMMENT_CREATE: 5,    // 댓글 작성
  POST_LIKE: 1,         // 게시글 추천받기
  COMMENT_LIKE: 1,      // 댓글 추천받기
  COIN_EXCHANGE_RATE: 1000  // 1000포인트 = 1코인
};

// 파일 업로드 설정
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  PROFILE_IMAGE_SIZE: 200 // 프로필 이미지 크기 (px)
};

// 차트 설정
export const CHART = {
  DEFAULT_COIN: 'KRW-BTC',
  DEFAULT_TIMEFRAME: '1D',
  REFRESH_INTERVAL: 5000, // 5초
  SUPPORTED_COINS: [
    { symbol: 'KRW-BTC', name: '비트코인', displayName: 'Bitcoin' },
    { symbol: 'KRW-ETH', name: '이더리움', displayName: 'Ethereum' },
    { symbol: 'KRW-XRP', name: '리플', displayName: 'Ripple' },
    { symbol: 'KRW-ADA', name: '에이다', displayName: 'Cardano' },
    { symbol: 'KRW-DOT', name: '폴카닷', displayName: 'Polkadot' }
  ]
};

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_INFO: 'user_info',
  REFRESH_TOKEN: 'refresh_token',
  THEME: 'theme',
  LANGUAGE: 'language'
};

// 에러 메시지
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청하신 페이지를 찾을 수 없습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  VALIDATION_ERROR: '입력하신 정보를 확인해주세요.'
};
