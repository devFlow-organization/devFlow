export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  private: boolean;
  default_branch: string;
}

export type AppState = 'login' | 'select-repo' | 'dashboard' | 'admin' | 'signup' | 'profile-setup';

export type TabType = 'metrics' | 'team-health' | 'intelligence' | 'actions' | 'efficiency' | 'context' | 'survey';

export interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType<any>;
}

export interface User {
  id: string;
  login: string;
  avatar_url: string;
  name?: string;
  email?: string;
}

// 사용자 프로필 관련 타입들
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  team: TeamInfo;
  jobType: JobType;
  repositories: RepositoryAssignment[];
  experience: ExperienceInfo;
  organization: OrganizationInfo;
  createdAt: string;
  updatedAt: string;
}

export interface TeamInfo {
  id: string;
  name: string;
  type: TeamType;
  description?: string;
}

export interface RepositoryAssignment {
  repository: Repository;
  role: 'developer' | 'reviewer' | 'admin' | 'maintainer';
  joinedAt: string;
  isActive: boolean;
}

export interface ExperienceInfo {
  hireDate: string;
  yearsOfExperience: number;
  level: 'junior' | 'mid' | 'senior' | 'lead' | 'principal';
  skills: string[];
}

export interface OrganizationInfo {
  id: string;
  name: string;
  domain: string;
  industry?: string;
}

export interface TeamMetrics {
  healthScore: number;
  productivityScore: number;
  efficiencyScore: number;
}

// 설문조사 관련 타입들
export type JobType = 'frontend' | 'backend' | 'mobile' | 'ml-data' | 'devops' | 'other';
export type TeamType = 'product' | 'infrastructure' | 'platform' | 'experiment' | 'other';
export type SatisfactionLevel = 1 | 2 | 3 | 4 | 5;
export type FocusTime = 'under-1h' | '1-3h' | '3-5h' | 'over-5h';
export type BuildTime = 'under-30s' | 'under-1m' | '1-3m' | 'over-3m';
export type ReviewTime = 'under-1h' | 'half-day' | '1-day' | '2-days';
export type FailureCount = '0' | '1-2' | '3-5' | 'over-5';

export interface SurveyData {
  // 기본 정보
  jobType: JobType;
  teamType: TeamType;
  
  // 개발 도구 및 환경 만족도
  editorSatisfaction: SatisfactionLevel;
  localEnvironmentSatisfaction: SatisfactionLevel;
  codeReviewSatisfaction: SatisfactionLevel;
  cicdSatisfaction: SatisfactionLevel;
  deploymentSatisfaction: SatisfactionLevel;
  monitoringSatisfaction: SatisfactionLevel;
  
  // 생산성 및 협업 경험
  focusTime: FocusTime;
  interruptions: string[];
  collaborationSatisfaction: SatisfactionLevel;
  toolSatisfaction: SatisfactionLevel;
  
  // 시스템 기반 지표 체감도
  buildTime: BuildTime;
  reviewTime: ReviewTime;
  failureCount: FailureCount;
  
  // 종합 만족도 및 개선 제안
  overallSatisfaction: SatisfactionLevel;
  improvementSuggestions: string;
  positiveFeedback: string;
  nsatScore?: number;
}

// 관리자 페이지 관련 타입들
export interface SurveyCampaign {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'completed' | 'paused';
  targetAudience: {
    jobTypes: JobType[];
    teamTypes: TeamType[];
    repositories: string[];
  };
  schedule: {
    startDate: string;
    endDate: string;
    reminderFrequency: 'once' | 'weekly' | 'biweekly';
  };
  responseCount: number;
  targetCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SurveyResponse {
  id: string;
  campaignId: string;
  userId: string;
  userEmail: string;
  submittedAt: string;
  data: SurveyData;
  status: 'submitted' | 'incomplete' | 'expired';
}

export interface SurveyAnalytics {
  totalResponses: number;
  completionRate: number;
  averageSatisfaction: number;
  averageNsatScore: number;
  responseTrend: {
    date: string;
    count: number;
  }[];
  satisfactionBreakdown: {
    level: SatisfactionLevel;
    count: number;
    percentage: number;
  }[];
  topImprovementSuggestions: string[];
  topPositiveFeedback: string[];
}

// 전체 팀 레벨 통계 관련 타입들
export interface OrganizationMetrics {
  totalRepositories: number;
  totalDevelopers: number;
  averageProductivityScore: number;
  averageHealthScore: number;
  averageEfficiencyScore: number;
  totalCommits: number;
  totalPullRequests: number;
  averageReviewTime: number;
  averageDeploymentFrequency: number;
  averageLeadTime: number;
  averageChangeFailureRate: number;
}

export interface RepositoryPerformance {
  repository: Repository;
  metrics: {
    productivityScore: number;
    healthScore: number;
    efficiencyScore: number;
    commitCount: number;
    pullRequestCount: number;
    averageReviewTime: number;
    deploymentFrequency: number;
    leadTime: number;
    changeFailureRate: number;
  };
  teamSize: number;
  lastActivity: string;
}

export interface TeamPerformance {
  teamName: string;
  repositories: RepositoryPerformance[];
  averageMetrics: {
    productivityScore: number;
    healthScore: number;
    efficiencyScore: number;
  };
  teamSize: number;
  memberCount: number;
}

export interface OrganizationTrends {
  period: string;
  productivityTrend: number;
  healthTrend: number;
  efficiencyTrend: number;
  satisfactionTrend: number;
  activityTrend: number;
} 