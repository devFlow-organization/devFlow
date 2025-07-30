import { useState, useEffect } from 'react';
import { UserProfile, TeamInfo, Repository, JobType, TeamType } from '../types';

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  // 임시 팀 데이터
  const availableTeams: TeamInfo[] = [
    {
      id: '1',
      name: '프론트엔드 팀',
      type: 'product',
      description: '웹 프론트엔드 개발'
    },
    {
      id: '2',
      name: '백엔드 팀',
      type: 'product',
      description: '서버 및 API 개발'
    },
    {
      id: '3',
      name: '모바일 팀',
      type: 'product',
      description: '모바일 앱 개발'
    },
    {
      id: '4',
      name: '인프라 팀',
      type: 'infrastructure',
      description: '시스템 인프라 관리'
    },
    {
      id: '5',
      name: '플랫폼 팀',
      type: 'platform',
      description: '플랫폼 서비스 개발'
    }
  ];

  // 임시 레포지토리 데이터
  const availableRepositories: Repository[] = [
    {
      id: 1,
      name: 'frontend-app',
      full_name: 'company/frontend-app',
      description: '메인 프론트엔드 애플리케이션',
      language: 'TypeScript',
      stargazers_count: 45,
      forks_count: 12,
      updated_at: '2024-01-20T10:30:00Z',
      private: true,
      default_branch: 'main'
    },
    {
      id: 2,
      name: 'backend-api',
      full_name: 'company/backend-api',
      description: '백엔드 API 서버',
      language: 'Java',
      stargazers_count: 32,
      forks_count: 8,
      updated_at: '2024-01-20T09:15:00Z',
      private: true,
      default_branch: 'main'
    },
    {
      id: 3,
      name: 'mobile-app',
      full_name: 'company/mobile-app',
      description: '모바일 애플리케이션',
      language: 'Swift',
      stargazers_count: 28,
      forks_count: 5,
      updated_at: '2024-01-20T08:45:00Z',
      private: true,
      default_branch: 'main'
    },
    {
      id: 4,
      name: 'infrastructure',
      full_name: 'company/infrastructure',
      description: '인프라 설정 및 관리',
      language: 'Terraform',
      stargazers_count: 15,
      forks_count: 3,
      updated_at: '2024-01-20T07:30:00Z',
      private: true,
      default_branch: 'main'
    }
  ];

  // 로컬 스토리지에서 프로필 로드
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setUserProfile(profile);
        setIsProfileComplete(true);
      } catch (error) {
        console.error('Failed to parse saved profile:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // 프로필 저장
  const saveProfile = (profile: UserProfile) => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setUserProfile(profile);
    setIsProfileComplete(true);
  };

  // 프로필 업데이트
  const updateProfile = (updates: Partial<UserProfile>) => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, ...updates, updatedAt: new Date().toISOString() };
      saveProfile(updatedProfile);
    }
  };

  // GitHub에서 사용자 정보 가져오기 (시뮬레이션)
  const fetchUserFromGitHub = async (accessToken: string) => {
    // 실제로는 GitHub API를 호출
    const mockUser = {
      id: '12345',
      email: 'user@company.com',
      name: '홍길동',
      avatar_url: 'https://github.com/github.png'
    };
    return mockUser;
  };

  // GitHub에서 조직 레포지토리 가져오기 (시뮬레이션)
  const fetchOrganizationRepositories = async (accessToken: string) => {
    // 실제로는 GitHub API를 호출
    return availableRepositories;
  };

  return {
    userProfile,
    isLoading,
    isProfileComplete,
    availableTeams,
    availableRepositories,
    saveProfile,
    updateProfile,
    fetchUserFromGitHub,
    fetchOrganizationRepositories
  };
}; 