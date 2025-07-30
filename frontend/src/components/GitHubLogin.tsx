import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Github, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { apiClient, API_CONFIG } from '../config/api';

interface GitHubLoginProps {
  onLoginSuccess: (accessToken: string) => void;
  isAuthenticated?: boolean;
}

const GitHubLogin: React.FC<GitHubLoginProps> = ({ onLoginSuccess, isAuthenticated = false }) => {
  const [loading, setLoading] = useState(false);

  // URL 파라미터에서 로그인 결과 확인
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const loginStatus = urlParams.get('login');
    const error = urlParams.get('error');
    const token = urlParams.get('token');

    if (loginStatus === 'success' && token) {
      // URL에서 파라미터 제거
      window.history.replaceState({}, document.title, window.location.pathname);
      onLoginSuccess(token);
    } else if (error) {
      console.error('Login error:', error);
      // URL에서 파라미터 제거
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [onLoginSuccess]);

  const handleGitHubLogin = async () => {
    try {
      setLoading(true);
      
      // 백엔드에서 GitHub 로그인 URL 가져오기
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.GITHUB_LOGIN_URL);
      
      if (response.loginUrl) {
        // GitHub OAuth 페이지로 리다이렉트
        window.location.href = response.loginUrl;
      } else {
        throw new Error('GitHub 로그인 URL을 가져올 수 없습니다.');
      }
    } catch (error) {
      console.error('GitHub login error:', error);
      // 에러 발생 시 직접 GitHub OAuth URL 생성 (fallback)
      const clientId = API_CONFIG.GITHUB_CLIENT_ID;
      const redirectUri = encodeURIComponent('http://localhost:8080/api/auth/github/callback');
      const scope = encodeURIComponent('repo user');
      
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
      window.location.href = githubAuthUrl;
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle>GitHub 연동 완료</CardTitle>
            <CardDescription>
              GitHub 계정이 성공적으로 연동되었습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => onLoginSuccess('mock-token')} className="w-full">
              다음 단계로 진행
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <Github className="w-6 h-6" />
          </div>
          <CardTitle>GitHub 연동</CardTitle>
          <CardDescription>
            개발자 생산성 지표를 분석하기 위해 GitHub 계정을 연동해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>연동 후 다음 정보에 접근할 수 있습니다:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>저장소 정보 및 커밋 히스토리</li>
              <li>Pull Request 및 코드 리뷰 데이터</li>
              <li>이슈 및 프로젝트 관리 정보</li>
            </ul>
          </div>
          
          <Button 
            onClick={handleGitHubLogin}
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-gray-800"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                로그인 중...
              </>
            ) : (
              <>
                <Github className="w-4 h-4 mr-2" />
                GitHub로 로그인
              </>
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            보안을 위해 필요한 최소한의 권한만 요청합니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GitHubLogin; 