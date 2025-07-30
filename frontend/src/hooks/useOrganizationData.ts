import { useState, useMemo } from 'react';
import { 
  OrganizationMetrics, 
  RepositoryPerformance, 
  TeamPerformance, 
  OrganizationTrends,
  Repository 
} from '../types';

export const useOrganizationData = () => {
  // 임시 조직 메트릭 데이터
  const organizationMetrics: OrganizationMetrics = useMemo(() => ({
    totalRepositories: 24,
    totalDevelopers: 156,
    averageProductivityScore: 8.4,
    averageHealthScore: 8.7,
    averageEfficiencyScore: 7.9,
    totalCommits: 2847,
    totalPullRequests: 892,
    averageReviewTime: 4.2,
    averageDeploymentFrequency: 12.5,
    averageLeadTime: 2.3,
    averageChangeFailureRate: 3.2
  }), []);

  // 임시 레포지토리 성과 데이터
  const repositoryPerformance: RepositoryPerformance[] = useMemo(() => [
    {
      repository: {
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
      metrics: {
        productivityScore: 8.7,
        healthScore: 9.1,
        efficiencyScore: 8.3,
        commitCount: 342,
        pullRequestCount: 89,
        averageReviewTime: 3.8,
        deploymentFrequency: 15.2,
        leadTime: 1.9,
        changeFailureRate: 2.1
      },
      teamSize: 8,
      lastActivity: '2024-01-20T10:30:00Z'
    },
    {
      repository: {
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
      metrics: {
        productivityScore: 8.2,
        healthScore: 8.5,
        efficiencyScore: 7.8,
        commitCount: 298,
        pullRequestCount: 76,
        averageReviewTime: 4.5,
        deploymentFrequency: 11.8,
        leadTime: 2.6,
        changeFailureRate: 3.8
      },
      teamSize: 6,
      lastActivity: '2024-01-20T09:15:00Z'
    },
    {
      repository: {
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
      metrics: {
        productivityScore: 7.9,
        healthScore: 8.2,
        efficiencyScore: 7.5,
        commitCount: 156,
        pullRequestCount: 42,
        averageReviewTime: 5.1,
        deploymentFrequency: 8.9,
        leadTime: 3.2,
        changeFailureRate: 4.5
      },
      teamSize: 4,
      lastActivity: '2024-01-20T08:45:00Z'
    }
  ], []);

  // 임시 팀 성과 데이터
  const teamPerformance: TeamPerformance[] = useMemo(() => [
    {
      teamName: '프론트엔드 팀',
      repositories: repositoryPerformance.filter(rp => rp.repository.name.includes('frontend')),
      averageMetrics: {
        productivityScore: 8.7,
        healthScore: 9.1,
        efficiencyScore: 8.3
      },
      teamSize: 8,
      memberCount: 8
    },
    {
      teamName: '백엔드 팀',
      repositories: repositoryPerformance.filter(rp => rp.repository.name.includes('backend')),
      averageMetrics: {
        productivityScore: 8.2,
        healthScore: 8.5,
        efficiencyScore: 7.8
      },
      teamSize: 6,
      memberCount: 6
    },
    {
      teamName: '모바일 팀',
      repositories: repositoryPerformance.filter(rp => rp.repository.name.includes('mobile')),
      averageMetrics: {
        productivityScore: 7.9,
        healthScore: 8.2,
        efficiencyScore: 7.5
      },
      teamSize: 4,
      memberCount: 4
    }
  ], [repositoryPerformance]);

  // 임시 조직 트렌드 데이터
  const organizationTrends: OrganizationTrends[] = useMemo(() => [
    {
      period: '2024-01',
      productivityTrend: 8.4,
      healthTrend: 8.7,
      efficiencyTrend: 7.9,
      satisfactionTrend: 8.2,
      activityTrend: 8.6
    },
    {
      period: '2023-12',
      productivityTrend: 8.1,
      healthTrend: 8.4,
      efficiencyTrend: 7.6,
      satisfactionTrend: 7.9,
      activityTrend: 8.2
    },
    {
      period: '2023-11',
      productivityTrend: 7.8,
      healthTrend: 8.1,
      efficiencyTrend: 7.3,
      satisfactionTrend: 7.6,
      activityTrend: 7.9
    }
  ], []);

  return {
    organizationMetrics,
    repositoryPerformance,
    teamPerformance,
    organizationTrends
  };
}; 