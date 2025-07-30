// API 설정
export const API_CONFIG = {
  // 백엔드 API 기본 URL
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  
  // GitHub OAuth 설정
  // TODO: 실제 GitHub Client ID로 변경하세요
  GITHUB_CLIENT_ID: process.env.REACT_APP_GITHUB_CLIENT_ID || 'Iv23lij6z2GojB8OffFO',
  
  // 환경 설정
  ENV: process.env.REACT_APP_ENV || 'development',
  
  // API 엔드포인트
  ENDPOINTS: {
    // OAuth 관련
    GITHUB_LOGIN_URL: '/auth/github/login',
    GITHUB_CALLBACK: '/auth/github/callback',
    GITHUB_AUTHENTICATE: '/auth/github/authenticate',
    
    // 사용자 관련
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
    USER_PROFILE: '/users/profile',
    CHECK_USER_EXISTS: '/auth/check-user',
    
    // 저장소 관련 (아직 구현되지 않았을 수 있음)
    REPOSITORIES: '/repositories',
    REPOSITORY_METRICS: (repoId: string) => `/repositories/${repoId}/metrics`,
    REPOSITORY_COMMITS: (repoId: string) => `/repositories/${repoId}/commits`,
    REPOSITORY_PULL_REQUESTS: (repoId: string) => `/repositories/${repoId}/pull-requests`,
    REPOSITORY_ISSUES: (repoId: string) => `/repositories/${repoId}/issues`,
  }
};

// API 헬퍼 함수들
export const apiClient = {
  // 기본 헤더 설정
  getHeaders: (accessToken?: string) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    return headers;
  },

  // GET 요청
  get: async (endpoint: string, accessToken?: string) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      headers: apiClient.getHeaders(accessToken),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    return response.json();
  },

  // POST 요청
  post: async (endpoint: string, data: any, accessToken?: string) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: apiClient.getHeaders(accessToken),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    return response.json();
  },

  // PUT 요청
  put: async (endpoint: string, data: any, accessToken?: string) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: apiClient.getHeaders(accessToken),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    return response.json();
  },

  // DELETE 요청
  delete: async (endpoint: string, accessToken?: string) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: apiClient.getHeaders(accessToken),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    return response.json();
  },

  // 사용자 인증 관련 함수들
  auth: {
    // GitHub OAuth 후 사용자 확인
    checkUserAfterGitHubAuth: async (accessToken: string) => {
      return apiClient.post(API_CONFIG.ENDPOINTS.GITHUB_AUTHENTICATE, { accessToken });
    },
    
    // 사용자 프로필 저장
    saveUserProfile: async (profile: any, accessToken: string) => {
      return apiClient.post(API_CONFIG.ENDPOINTS.USER_PROFILE, profile, accessToken);
    },
    
    // 사용자 존재 여부 확인
    checkUserExists: async (accessToken: string) => {
      return apiClient.get(API_CONFIG.ENDPOINTS.CHECK_USER_EXISTS, accessToken);
    },
  },
}; 