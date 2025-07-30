import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { useTeamData } from '../../hooks/useTeamData';

export default function ContextTab() {
  const { teamMembers } = useTeamData();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>행동 패턴 분석</CardTitle>
          <CardDescription>정량 지표 너머의 맥락적 신호 탐지</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4>{member.name}</h4>
                <Badge variant="outline">협업적</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium mb-2">정량적 변화</h5>
                  <ul className="text-sm space-y-1">
                    <li>• 주간 커밋 수: 28개 (평균 대비 +12%)</li>
                    <li>• PR 크기: 평균 156줄 (-8%)</li>
                    <li>• 코드 리뷰 댓글: 주 23개 (-15%)</li>
                    <li>• 1:1 미팅 빈도: 격주 → 주간</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-2">정성적 관찰</h5>
                  <ul className="text-sm space-y-1">
                    <li>• 코드 리뷰 댓글의 톤이 더 간결해짐</li>
                    <li>• Slack 응답 시간이 평소보다 빨라짐</li>
                    <li>• 기술적 질문보다 일정 관련 질문 증가</li>
                    <li>• 점심시간 팀 소통 참여도 감소</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm">
                  <strong>맥락 해석:</strong> {member.aiInsight}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
} 