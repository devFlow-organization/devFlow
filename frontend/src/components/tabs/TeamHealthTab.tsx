import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Brain, Heart, Users, TrendingUp } from 'lucide-react';
import { useTeamData } from '../../hooks/useTeamData';

export default function TeamHealthTab() {
  const { teamMembers } = useTeamData();

  const getBurnoutRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getEngagementColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>팀원별 상태 분석</CardTitle>
          <CardDescription>정성적 관찰과 정량적 지표의 통합</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4>{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role} • {member.experience}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getBurnoutRiskColor(member.burnoutRisk)}>
                    {member.burnoutRisk === 'low' ? '안전' : member.burnoutRisk === 'medium' ? '주의' : '위험'}
                  </Badge>
                  <Badge variant="outline" className={getEngagementColor(member.engagementLevel)}>
                    참여도 {member.engagementLevel === 'high' ? '높음' : member.engagementLevel === 'medium' ? '보통' : '낮음'}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">만족도:</span>
                  <span className="ml-2">{member.satisfactionScore}/10</span>
                </div>
                <div>
                  <span className="text-muted-foreground">집중시간:</span>
                  <span className="ml-2">{member.weeklyFocusTime}h/주</span>
                </div>
              </div>

              <Alert>
                <Brain className="w-4 h-4" />
                <AlertDescription className="text-sm">
                  <strong>AI 인사이트:</strong> {member.aiInsight}
                </AlertDescription>
              </Alert>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>팀 문화 건강도</CardTitle>
          <CardDescription>심리적 안정감과 협업 문화 평가</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h4>심리적 안정감</h4>
              <p className="text-2xl font-medium text-green-600 my-2">8.7/10</p>
              <p className="text-sm text-muted-foreground">팀원들이 자유롭게 의견을 표현하고 실수를 공유할 수 있는 환경</p>
            </div>
            
            <div className="p-4 border rounded-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h4>협업 효과성</h4>
              <p className="text-2xl font-medium text-blue-600 my-2">8.2/10</p>
              <p className="text-sm text-muted-foreground">팀 목표 달성을 위한 효과적인 협력과 의사소통</p>
            </div>
            
            <div className="p-4 border rounded-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h4>학습 지향성</h4>
              <p className="text-2xl font-medium text-purple-600 my-2">9.1/10</p>
              <p className="text-sm text-muted-foreground">새로운 기술과 방법에 대한 개방적 태도와 지속적 학습</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 