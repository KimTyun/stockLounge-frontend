// 로컬 스토리지 관련 유틸리티
export const storage = {
  // 데이터 저장
  set: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  },

  // 데이터 가져오기
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  },

  // 데이터 삭제
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  },

  // 모든 데이터 삭제
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  },

  // 키 존재 여부 확인
  exists: (key) => {
    return localStorage.getItem(key) !== null;
  }
};

// 세션 스토리지 관련 유틸리티
export const sessionStorage = {
  // 데이터 저장
  set: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      window.sessionStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error('SessionStorage set error:', error);
      return false;
    }
  },

  // 데이터 가져오기
  get: (key, defaultValue = null) => {
    try {
      const item = window.sessionStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error('SessionStorage get error:', error);
      return defaultValue;
    }
  },

  // 데이터 삭제
  remove: (key) => {
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('SessionStorage remove error:', error);
      return false;
    }
  },

  // 모든 데이터 삭제
  clear: () => {
    try {
      window.sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('SessionStorage clear error:', error);
      return false;
    }
  },

  // 키 존재 여부 확인
  exists: (key) => {
    return window.sessionStorage.getItem(key) !== null;
  }
};

// 쿠키 관련 유틸리티
export const cookies = {
  // 쿠키 설정
  set: (name, value, days = 7) => {
    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
      return true;
    } catch (error) {
      console.error('Cookie set error:', error);
      return false;
    }
  },

  // 쿠키 가져오기
  get: (name) => {
    try {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    } catch (error) {
      console.error('Cookie get error:', error);
      return null;
    }
  },

  // 쿠키 삭제
  remove: (name) => {
    try {
      document.cookie = name + '=; Max-Age=-99999999;';
      return true;
    } catch (error) {
      console.error('Cookie remove error:', error);
      return false;
    }
  }
};

// 브라우저 지원 여부 확인
export const isStorageSupported = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

// 저장소 크기 확인 (대략적)
export const getStorageSize = () => {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total;
};

// 저장소 용량 한계 확인
export const checkStorageQuota = async () => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate();
      return {
        quota: estimate.quota,
        usage: estimate.usage,
        available: estimate.quota - estimate.usage,
        percentage: (estimate.usage / estimate.quota) * 100
      };
    } catch (error) {
      console.error('Storage quota check error:', error);
      return null;
    }
  }
  return null;
};
