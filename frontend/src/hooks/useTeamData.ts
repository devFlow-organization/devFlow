import { useState, useMemo } from 'react';

export interface TeamMember {
  name: string;
  role: string;
  experience: string;
  strength: string;
  weeklyFocusTime: number;
  codeReviewResponseTime: number;
  deploymentSuccessRate: number;
  changeFailureRate: number;
  satisfactionScore: number;
  engagementLevel: 'high' | 'medium' | 'low';
  burnoutRisk: 'high' | 'medium' | 'low';
  communicationPattern: string;
  recentBehaviorChange: string;
  aiInsight: string;
}

export interface TeamInsight {
  type: string;
  severity: string;
  title: string;
  description: string;
  action: string;
  affectedMembers: string[];
}

export interface Metric {
  value: string;
  trend: string;
  status: 'excellent' | 'good' | 'warning' | 'poor';
}

export function useTeamData() {
  const teamMembers: TeamMember[] = useMemo(() => [
    {
      name: '김개발',
      role: '시니어 개발자',
      experience: '8년',
      strength: '아키텍처 설계',
      weeklyFocusTime: 28,
      codeReviewResponseTime: 4.2,
      deploymentSuccessRate: 98,
      changeFailureRate: 2,
      satisfactionScore: 8.5,
      engagementLevel: 'high',
      burnoutRisk: 'medium',
      communicationPattern: 'collaborative',
      recentBehaviorChange: '최근 코드 리뷰 댓글이 평소보다 짧아짐',
      aiInsight: '업무 부하가 높아 번아웃 위험. 업무 재분배 고려 필요'
    },
    {
      name: '이백엔드',
      role: '백엔드 개발자',
      experience: '5년',
      strength: 'API 설계',
      weeklyFocusTime: 32,
      codeReviewResponseTime: 2.8,
      deploymentSuccessRate: 95,
      changeFailureRate: 5,
      satisfactionScore: 9.2,
      engagementLevel: 'high',
      burnoutRisk: 'low',
      communicationPattern: 'supportive',
      recentBehaviorChange: '새로운 기술에 대한 질문 빈도 증가',
      aiInsight: '학습 의욕이 높고 팀에 긍정적 영향. 멘토 역할 적합'
    },
    {
      name: '박프론트',
      role: '프론트엔드 개발자',
      experience: '3년',
      strength: 'UI/UX 구현',
      weeklyFocusTime: 25,
      codeReviewResponseTime: 6.1,
      deploymentSuccessRate: 92,
      changeFailureRate: 8,
      satisfactionScore: 7.8,
      engagementLevel: 'medium',
      burnoutRisk: 'low',
      communicationPattern: 'reserved',
      recentBehaviorChange: '1:1 미팅 요청 증가, 기술적 도전 언급',
      aiInsight: '성장 욕구가 있으나 기회 부족. 새로운 도전 과제 제공 권장'
    }
  ], []);

  const doraMetrics = useMemo(() => ({
    deploymentFrequency: { value: '주 3.2회', trend: '+15%', status: 'good' as const },
    leadTime: { value: '2.4일', trend: '-8%', status: 'good' as const },
    meanTimeToRestore: { value: '45분', trend: '-22%', status: 'excellent' as const },
    changeFailureRate: { value: '5.2%', trend: '+2%', status: 'warning' as const }
  }), []);

  const spaceMetrics = useMemo(() => ({
    satisfaction: { value: '8.5/10', trend: '+0.3', status: 'good' as const },
    performance: { value: '87%', trend: '+5%', status: 'good' as const },
    activity: { value: '142 commits/week', trend: '-3%', status: 'good' as const },
    communication: { value: '94% response rate', trend: '+12%', status: 'excellent' as const },
    efficiency: { value: '28.5h focus time/week', trend: '+7%', status: 'good' as const }
  }), []);

  const teamInsights: TeamInsight[] = useMemo(() => [
    {
      type: 'burnout-risk',
      severity: 'medium',
      title: '번아웃 위험 감지',
      description: '김개발님의 주간 집중시간이 평균 대비 20% 증가했으나, 코드 리뷰 품질이 하락했습니다.',
      action: '업무 재분배 또는 휴식 권장',
      affectedMembers: ['김개발']
    },
    {
      type: 'growth-opportunity',
      severity: 'low',
      title: '성장 기회',
      description: '박프론트님이 백엔드 관련 질문을 자주 하고 있어 풀스택 성장 의지를 보입니다.',
      action: '크로스 트레이닝 기회 제공',
      affectedMembers: ['박프론트']
    },
    {
      type: 'collaboration-strength',
      severity: 'positive',
      title: '협업 강화',
      description: '이백엔드님이 다른 팀원들의 PR에 적극적으로 도움을 주며 팀 분위기 개선에 기여하고 있습니다.',
      action: '멘토 역할 공식화 고려',
      affectedMembers: ['이백엔드']
    }
  ], []);

  const timeLossAnalysis = useMemo(() => ({
    totalLossPercentage: 18,
    weeklyLossHours: 21.6,
    monthlyCost: 85000,
    categories: [
      { name: '빌드/배포 대기', percentage: 7, hours: 8.4 },
      { name: '코드 리뷰 지연', percentage: 5, hours: 6.0 },
      { name: '환경 설정 문제', percentage: 3, hours: 3.6 },
      { name: '회의/인터럽션', percentage: 3, hours: 3.6 }
    ]
  }), []);

  return {
    teamMembers,
    doraMetrics,
    spaceMetrics,
    teamInsights,
    timeLossAnalysis
  };
} 