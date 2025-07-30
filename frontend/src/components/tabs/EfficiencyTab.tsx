import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { Lightbulb } from 'lucide-react';
import { useTeamData } from '../../hooks/useTeamData';

export default function EfficiencyTab() {
  const { teamMembers } = useTeamData();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>딜리버리 용이성</CardTitle>
          <CardDescription>개발자가 작업을 수행하는 것이 얼마나 쉬운지 측정</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <h4>전체 용이성 점수</h4>
              <p className="text-sm text-muted-foreground">지난 주 대비 +0.3점 향상</p>
            </div>
            <p className="text-3xl font-medium text-green-600">8.4/10</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>환경 설정</span>
              <div className="flex items-center gap-2">
                <Progress value={85} className="w-20" />
                <span className="text-sm">8.5/10</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>배포 프로세스</span>
              <div className="flex items-center gap-2">
                <Progress value={90} className="w-20" />
                <span className="text-sm">9.0/10</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>테스트 실행</span>
              <div className="flex items-center gap-2">
                <Progress value={75} className="w-20" />
                <span className="text-sm">7.5/10</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>집중 시간 분석</CardTitle>
          <CardDescription>팀원별 집중 시간 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="p-3 border rounded-lg text-center">
                <p className="text-sm text-muted-foreground">{member.name}</p>
                <p className="text-xl font-medium">{member.weeklyFocusTime}h</p>
                <p className="text-xs text-muted-foreground">주간 집중시간</p>
              </div>
            ))}
          </div>
          
          <Alert>
            <Lightbulb className="w-4 h-4" />
            <AlertDescription>
              <strong>개선 제안:</strong> 오전 9-11시 no-meeting 시간 설정으로 집중 시간 15% 추가 확보 가능
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
} 