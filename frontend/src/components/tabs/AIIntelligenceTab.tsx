import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Brain, 
  AlertTriangle, 
  Clock, 
  Users, 
  Calendar, 
  Target,
  AlertCircle,
  TrendingUp,
  ThumbsUp
} from 'lucide-react';
import { useTeamData } from '../../hooks/useTeamData';

export default function AIIntelligenceTab() {
  const { teamInsights } = useTeamData();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              팀 상태 AI 분석
            </CardTitle>
            <CardDescription>정량 데이터와 행동 패턴을 종합한 인사이트</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamInsights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                insight.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                insight.severity === 'positive' ? 'border-green-500 bg-green-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="flex items-center gap-2">
                    {insight.type === 'burnout-risk' && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                    {insight.type === 'growth-opportunity' && <TrendingUp className="w-4 h-4 text-blue-600" />}
                    {insight.type === 'collaboration-strength' && <ThumbsUp className="w-4 h-4 text-green-600" />}
                    {insight.title}
                  </h4>
                  <div className="flex gap-1">
                    {insight.affectedMembers.map((member, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{member}</Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                <p className="text-sm">{insight.action}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>실시간 경고</CardTitle>
            <CardDescription>즉시 조치가 필요한 이슈</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <div>
                <p className="text-sm">배포 실패율 증가</p>
                <p className="text-xs text-muted-foreground">지난 3일간 8% → 12%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-4 h-4 text-yellow-600" />
              <div>
                <p className="text-sm">코드 리뷰 지연</p>
                <p className="text-xs text-muted-foreground">평균 응답시간 4.2h → 6.8h</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Users className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm">팀 소통 활발</p>
                <p className="text-xs text-muted-foreground">주간 커뮤니케이션 +15%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>맥락 기반 권장사항</CardTitle>
          <CardDescription>AI가 분석한 팀 상황별 최적 액션</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                단기 액션 (이번 주)
              </h4>
              <ul className="space-y-1 text-sm">
                <li>• 김개발님과 1:1 미팅으로 업무 부하 논의</li>
                <li>• 박프론트님에게 백엔드 페어 프로그래밍 기회 제공</li>
                <li>• 코드 리뷰 프로세스 최적화 회의 일정 잡기</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-green-600" />
                장기 전략 (이번 달)
              </h4>
              <ul className="space-y-1 text-sm">
                <li>• 이백엔드님을 멘토로 하는 지식 공유 체계 구축</li>
                <li>• 자동화된 배포 파이프라인 개선으로 실패율 감소</li>
                <li>• 팀 로테이션을 통한 지식 분산과 위험 감소</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 