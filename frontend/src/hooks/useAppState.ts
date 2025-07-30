import { useState, useEffect } from 'react';
import { AppState, TabType, Repository, UserProfile } from '../types';
import { apiClient, API_CONFIG } from '../config/api';

export const useAppState = () => {
  const [appState, setAppState] = useState<AppState>('login');
  const [activeTab, setActiveTab] = useState<TabType>('metrics');
  const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // 로컬 스토리지에서 상태 복원
  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');
    const savedProfile = localStorage.getItem('userProfile');
    
    if (savedToken) {
      setAccessToken(savedToken);
      if (savedProfile) {
        try {
          const profile = JSON.parse(savedProfile);
          setUserProfile(profile);
          setAppState('select-repo');
        } catch (error) {
          console.error('Failed to parse saved profile:', error);
          setAppState('signup');
        }
      } else {
        setAppState('signup');
      }
    }
  }, []);

  const handleLoginSuccess = async (token: string) => {
    setAccessToken(token);
    localStorage.setItem('accessToken', token);
    
    try {
      // 백엔드 API 연동
      const response = await apiClient.auth.checkUserAfterGitHubAuth(token);
      const { isNewUser, user } = response;
      
      if (isNewUser) {
        // 신규 사용자: 회원가입 페이지로
        setAppState('signup');
      } else {
        // 기존 사용자: 바로 레포지토리 선택으로
        setUserProfile(user);
        setAppState('select-repo');
      }
    } catch (error) {
      console.error('Login error:', error);
      // API 에러 시 임시 로직: 로컬 스토리지에서 기존 사용자 확인
      const existingUser = localStorage.getItem('userProfile');
      
      if (existingUser) {
        setAppState('select-repo');
      } else {
        setAppState('signup');
      }
    }
  };

  const handleRepositorySelect = (repo: Repository) => {
    setSelectedRepository(repo);
    setAppState('dashboard');
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleBackToRepos = () => {
    setSelectedRepository(null);
    setAppState('select-repo');
  };

  const handleLogout = () => {
    setAccessToken(null);
    setSelectedRepository(null);
    setUserProfile(null);
    setActiveTab('metrics');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userProfile');
    setAppState('login');
  };

  const handleGoToAdmin = () => {
    setAppState('admin');
  };

  const handleBackFromAdmin = () => {
    setAppState('select-repo');
  };

  const handleSignupComplete = async (profile: UserProfile) => {
    try {
      // 백엔드 API 연동
      await apiClient.auth.saveUserProfile(profile, accessToken!);
      
      // 성공 시 상태 업데이트
      setUserProfile(profile);
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setAppState('select-repo');
    } catch (error) {
      console.error('Profile save error:', error);
      // API 에러 시에도 로컬에 저장하고 진행 (임시)
      setUserProfile(profile);
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setAppState('select-repo');
    }
  };

  const handleBackFromSignup = () => {
    setAppState('login');
  };

  return {
    appState,
    activeTab,
    selectedRepository,
    accessToken,
    userProfile,
    handleLoginSuccess,
    handleRepositorySelect,
    handleTabChange,
    handleBackToRepos,
    handleLogout,
    handleGoToAdmin,
    handleBackFromAdmin,
    handleSignupComplete,
    handleBackFromSignup
  };
}; 