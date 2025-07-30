import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  BarChart3, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Zap,
  Target,
  Activity,
  Gauge,
  Heart,
  Brain
} from 'lucide-react';
import { TabType } from '../../types';
import { useTeamData } from '../../hooks/useTeamData';

interface MetricsTabProps {
  onTabChange?: (tab: TabType) => void;
}

interface CompanyMetrics {
  name: string;
  description: string;
  metrics: {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
    description: string;
    targetTab?: TabType;
  }[];
  focus: string[];
}

const companyData: Record<string, CompanyMetrics> = {
  google: {
    name: "Google",
    description: "속도, 용이성, 품질의 세 가지 차원으로 생산성을 측정",
    focus: ["Speed (속도)", "Ease (용이성)", "Quality (품질)"],
    metrics: [
      {
        title: "코드 리뷰 완료 시간",
        value: "2.3일",
        change: "-15%",
        icon: <Clock className="w-4 h-4" />,
        description: "평균 코드 리뷰 완료 시간",
        targetTab: 'efficiency'
      },
      {
        title: "개발자 만족도",
        value: "92%",
        change: "+8%",
        icon: <Heart className="w-4 h-4" />,
        description: "개발 도구 및 프로세스 만족도",
        targetTab: 'team-health'
      },
      {
        title: "빌드 성공률",
        value: "98.5%",
        change: "+2.1%",
        icon: <CheckCircle className="w-4 h-4" />,
        description: "CI/CD 파이프라인 성공률",
        targetTab: 'efficiency'
      },
      {
        title: "배포 빈도",
        value: "12회/일",
        change: "+25%",
        icon: <Zap className="w-4 h-4" />,
        description: "일일 평균 배포 횟수",
        targetTab: 'efficiency'
      }
    ]
  },
  linkedin: {
    name: "LinkedIn",
    description: "질적 및 양적 지표를 혼합한 종합적 접근",
    focus: ["Developer NSAT", "Build Time", "Code Review Response", "CI Speed"],
    metrics: [
      {
        title: "개발자 NSAT",
        value: "4.2/5.0",
        change: "+0.3",
        icon: <Users className="w-4 h-4" />,
        description: "개발자 순 사용자 만족도",
        targetTab: 'team-health'
      },
      {
        title: "빌드 시간 (P90)",
        value: "45초",
        change: "-30%",
        icon: <Clock className="w-4 h-4" />,
        description: "90% 백분위 빌드 완료 시간",
        targetTab: 'efficiency'
      },
      {
        title: "코드 리뷰 응답 시간",
        value: "4.2시간",
        change: "-20%",
        icon: <Activity className="w-4 h-4" />,
        description: "평균 코드 리뷰 응답 시간",
        targetTab: 'context'
      },
      {
        title: "배포 성공률",
        value: "99.2%",
        change: "+0.8%",
        icon: <CheckCircle className="w-4 h-4" />,
        description: "프로덕션 배포 성공률",
        targetTab: 'efficiency'
      }
    ]
  },
  notion: {
    name: "Notion",
    description: "이동 가능한 지표에 집중한 실용적 접근",
    focus: ["Ease of Delivery", "Engagement", "Time Loss", "Change Failure Rate"],
    metrics: [
      {
        title: "딜리버리 용이성",
        value: "8.5/10",
        change: "+1.2",
        icon: <Gauge className="w-4 h-4" />,
        description: "개발자 작업 수행 용이성",
        targetTab: 'efficiency'
      },
      {
        title: "개발자 참여도",
        value: "87%",
        change: "+12%",
        icon: <Heart className="w-4 h-4" />,
        description: "개발자 업무 참여도",
        targetTab: 'team-health'
      },
      {
        title: "시간 손실률",
        value: "8%",
        change: "-5%",
        icon: <AlertTriangle className="w-4 h-4" />,
        description: "장애물로 인한 시간 손실",
        targetTab: 'efficiency'
      },
      {
        title: "변경 실패율",
        value: "2.1%",
        change: "-1.5%",
        icon: <Target className="w-4 h-4" />,
        description: "DORA 지표 - 배포 실패율",
        targetTab: 'actions'
      }
    ]
  }
};

const MetricsTab: React.FC<MetricsTabProps> = ({ onTabChange }) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('google');
  const { doraMetrics, spaceMetrics } = useTeamData();

  const handleCardClick = (tab: TabType) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const currentCompany = companyData[selectedCompany];

  return (
    <div className="space-y-6">
      {/* 팀 메트릭 */}
      <Card>
        <CardHeader>
          <CardTitle>현재 팀 메트릭</CardTitle>
          <CardDescription>실시간 팀 생산성 및 건강도 지표</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCardClick('efficiency')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">배포 빈도</CardTitle>
                <Badge variant="secondary">{doraMetrics.deploymentFrequency.trend}</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4" />
                  <div className="text-2xl font-bold">{doraMetrics.deploymentFrequency.value}</div>
                </div>
                <p className="text-xs text-muted-foreground">주간 평균 배포 횟수</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCardClick('efficiency')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">리드 타임</CardTitle>
                <Badge variant="secondary">{doraMetrics.leadTime.trend}</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4" />
                  <div className="text-2xl font-bold">{doraMetrics.leadTime.value}</div>
                </div>
                <p className="text-xs text-muted-foreground">코드 커밋부터 배포까지</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCardClick('team-health')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">개발자 만족도</CardTitle>
                <Badge variant="secondary">{spaceMetrics.satisfaction.trend}</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4" />
                  <div className="text-2xl font-bold">{spaceMetrics.satisfaction.value}</div>
                </div>
                <p className="text-xs text-muted-foreground">개발 도구 및 프로세스 만족도</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCardClick('efficiency')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">집중 시간</CardTitle>
                <Badge variant="secondary">{spaceMetrics.efficiency.trend}</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4" />
                  <div className="text-2xl font-bold">{spaceMetrics.efficiency.value}</div>
                </div>
                <p className="text-xs text-muted-foreground">주간 평균 집중 시간</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* 회사 선택 */}
      <Card>
        <CardHeader>
          <CardTitle>회사별 생산성 지표</CardTitle>
          <CardDescription>
            실제 기술 회사들의 개발자 생산성 측정 방법을 확인하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            {Object.keys(companyData).map((company) => (
              <Button
                key={company}
                variant={selectedCompany === company ? "default" : "outline"}
                onClick={() => setSelectedCompany(company)}
                className="flex items-center gap-2"
              >
                {companyData[company].name}
              </Button>
            ))}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{currentCompany.name}</h3>
            <p className="text-sm text-muted-foreground">{currentCompany.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {currentCompany.focus.map((focus, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {focus}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 지표 카드들 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {currentCompany.metrics.map((metric, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => metric.targetTab && handleCardClick(metric.targetTab)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Badge variant="secondary">{metric.change}</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                {metric.icon}
                <div className="text-2xl font-bold">{metric.value}</div>
              </div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 추가 정보 */}
      <Card>
        <CardHeader>
          <CardTitle>측정 방법론</CardTitle>
          <CardDescription>
            각 회사의 개발자 생산성 측정 접근 방식
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold">Google - Goals, Signals, Metrics (GSM)</h4>
              <p className="text-sm text-muted-foreground">
                목표를 먼저 정의하고, 달성 신호를 찾은 후 적절한 지표를 선택하는 프레임워크
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold">LinkedIn - 혼합 접근법</h4>
              <p className="text-sm text-muted-foreground">
                분기별 설문조사, 실시간 피드백, 시스템 기반 지표를 조합한 종합적 측정
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold">Notion - 이동 가능한 지표</h4>
              <p className="text-sm text-muted-foreground">
                개발자 생산성 팀이 직접 영향을 미칠 수 있는 실용적인 지표에 집중
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsTab; 