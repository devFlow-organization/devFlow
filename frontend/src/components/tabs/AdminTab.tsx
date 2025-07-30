import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Plus, 
  Send, 
  BarChart3, 
  Users, 
  Calendar,
  Target,
  TrendingUp,
  Activity,
  Building2
} from 'lucide-react';
import { SurveyCampaign, SurveyAnalytics } from '../../types';
import OrganizationOverviewTab from './OrganizationOverviewTab';

export default function AdminTab() {
  const [activeTab, setActiveTab] = useState('overview');
  const [campaigns, setCampaigns] = useState<SurveyCampaign[]>([
    {
      id: '1',
      name: '2024년 1분기 개발자 경험 설문',
      description: '전체 개발팀 대상 개발자 경험 및 생산성 조사',
      status: 'active',
      targetAudience: {
        jobTypes: ['frontend', 'backend', 'mobile', 'ml-data', 'devops'],
        teamTypes: ['product', 'infrastructure', 'platform'],
        repositories: ['company/frontend-app', 'company/backend-api', 'company/mobile-app']
      },
      schedule: {
        startDate: '2024-01-01',
        endDate: '2024-03-31',
        reminderFrequency: 'weekly'
      },
      responseCount: 89,
      targetCount: 156,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-20T10:30:00Z'
    },
    {
      id: '2',
      name: '신규 개발자 온보딩 피드백',
      description: '신규 입사자 대상 개발 환경 및 프로세스 만족도 조사',
      status: 'draft',
      targetAudience: {
        jobTypes: ['frontend', 'backend'],
        teamTypes: ['product'],
        repositories: ['company/frontend-app', 'company/backend-api']
      },
      schedule: {
        startDate: '2024-02-01',
        endDate: '2024-02-28',
        reminderFrequency: 'once'
      },
      responseCount: 0,
      targetCount: 15,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z'
    }
  ]);

  const [analytics] = useState<SurveyAnalytics>({
    totalResponses: 89,
    completionRate: 57.1,
    averageSatisfaction: 8.2,
    averageNsatScore: 7.8,
    responseTrend: [
      { date: '2024-01-01', count: 5 },
      { date: '2024-01-08', count: 12 },
      { date: '2024-01-15', count: 18 },
      { date: '2024-01-22', count: 25 }
    ],
    satisfactionBreakdown: [
      { level: 5, count: 35, percentage: 39.3 },
      { level: 4, count: 28, percentage: 31.5 },
      { level: 3, count: 15, percentage: 16.9 },
      { level: 2, count: 8, percentage: 9.0 },
      { level: 1, count: 3, percentage: 3.4 }
    ],
    topImprovementSuggestions: [
      '빌드 시간 단축 필요',
      '코드 리뷰 프로세스 개선',
      '개발 환경 설정 간소화',
      '문서화 개선'
    ],
    topPositiveFeedback: [
      '팀 협업 문화가 좋음',
      '개발 도구가 잘 갖춰져 있음',
      '학습 기회가 많음',
      '업무 자율성이 높음'
    ]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '진행중';
      case 'draft': return '임시저장';
      case 'completed': return '완료';
      case 'paused': return '일시정지';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">관리자 대시보드</h2>
          <p className="text-muted-foreground">
            설문조사 관리 및 조직 전체 통계
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          새 캠페인 생성
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">조직 개요</TabsTrigger>
          <TabsTrigger value="campaigns">설문 캠페인</TabsTrigger>
          <TabsTrigger value="analytics">설문 분석</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <OrganizationOverviewTab />
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {campaign.name}
                        <Badge className={getStatusColor(campaign.status)}>
                          {getStatusText(campaign.status)}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{campaign.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        편집
                      </Button>
                      <Button variant="outline" size="sm">
                        복사
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {campaign.responseCount}
                      </div>
                      <div className="text-sm text-muted-foreground">응답 수</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {campaign.targetCount}
                      </div>
                      <div className="text-sm text-muted-foreground">대상 수</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round((campaign.responseCount / campaign.targetCount) * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">응답률</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {campaign.targetAudience.repositories.length}
                      </div>
                      <div className="text-sm text-muted-foreground">대상 레포</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>진행률</span>
                      <span>{Math.round((campaign.responseCount / campaign.targetCount) * 100)}%</span>
                    </div>
                    <Progress value={(campaign.responseCount / campaign.targetCount) * 100} />
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <div>기간: {campaign.schedule.startDate} ~ {campaign.schedule.endDate}</div>
                    <div>알림: {campaign.schedule.reminderFrequency === 'weekly' ? '주간' : '일회'}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 응답</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalResponses}</div>
                <p className="text-xs text-muted-foreground">
                  완료된 설문
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">완료율</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.completionRate}%</div>
                <p className="text-xs text-muted-foreground">
                  전체 대상 대비
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">평균 만족도</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.averageSatisfaction}/5</div>
                <p className="text-xs text-muted-foreground">
                  전체 평균
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">NSAT 점수</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.averageNsatScore}/10</div>
                <p className="text-xs text-muted-foreground">
                  Net Satisfaction
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>만족도 분포</CardTitle>
                <CardDescription>응답자별 만족도 수준</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.satisfactionBreakdown.map((item) => (
                    <div key={item.level} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                        <span className="text-sm">{item.level}점</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{item.count}명 ({item.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>주요 개선 제안</CardTitle>
                <CardDescription>응답자들이 가장 많이 언급한 개선사항</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analytics.topImprovementSuggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>긍정적 피드백</CardTitle>
              <CardDescription>응답자들이 만족하는 부분</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analytics.topPositiveFeedback.map((feedback, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">{feedback}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 