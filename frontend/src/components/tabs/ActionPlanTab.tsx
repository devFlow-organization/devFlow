import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Target } from 'lucide-react';
import { useTeamData } from '../../hooks/useTeamData';

export default function ActionPlanTab() {
  const { teamMembers } = useTeamData();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>우선순위 액션 아이템</CardTitle>
          <CardDescription>AI가 분석한 현재 상황별 최우선 조치사항</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-red-700">긴급 (24시간 내)</h4>
                <Badge variant="destructive">HIGH</Badge>
              </div>
              <ul className="text-sm space-y-1">
                <li>• 김개발님과 번아웃 위험 관련 1:1 미팅</li>
                <li>• 배포 실패율 급증 원인 분석 회의</li>
                <li>• P90 빌드 시간 증가 임시 조치</li>
              </ul>
            </div>
            
            <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-yellow-700">중요 (이번 주)</h4>
                <Badge variant="secondary">MEDIUM</Badge>
              </div>
              <ul className="text-sm space-y-1">
                <li>• 박프론트님 백엔드 크로스 트레이닝 계획</li>
                <li>• 코드 리뷰 프로세스 개선 논의</li>
                <li>• 집중 시간 확보를 위한 미팅 시간 조정</li>
              </ul>
            </div>
            
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-green-700">장기 (이번 달)</h4>
                <Badge variant="outline">LOW</Badge>
              </div>
              <ul className="text-sm space-y-1">
                <li>• 이백엔드님 멘토 프로그램 공식화</li>
                <li>• 자동화된 성과 추적 시스템 구축</li>
                <li>• 팀 문화 건강도 정기 측정 체계</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>개인별 성장 계획</CardTitle>
          <CardDescription>각 팀원의 강점과 성장 기회에 맞춘 맞춤형 계획</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4>{member.name}</h4>
                <Badge variant="outline">
                  {member.name === '김개발' ? '아키텍처 설계' :
                   member.name === '이백엔드' ? 'API 설계' : 'UI/UX 구현'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium mb-2 text-green-600">강점 활용</h5>
                  <ul className="text-sm space-y-1">
                    {member.name === '김개발' && (
                      <>
                        <li>• 아키텍처 결정 과정에서 리더십 발휘</li>
                        <li>• 주니어 개발자 멘토링 기회 제공</li>
                        <li>• 기술 스택 선택 시 의사결정 권한 확대</li>
                      </>
                    )}
                    {member.name === '이백엔드' && (
                      <>
                        <li>• API 설계 표준화 주도</li>
                        <li>• 팀 지식 공유 세션 진행</li>
                        <li>• 신입 개발자 온보딩 프로세스 개선</li>
                      </>
                    )}
                    {member.name === '박프론트' && (
                      <>
                        <li>• UI/UX 개선 프로젝트 주도</li>
                        <li>• 사용자 경험 관점에서의 피드백 제공</li>
                        <li>• 디자인 시스템 구축 참여</li>
                      </>
                    )}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-2 text-blue-600">성장 기회</h5>
                  <ul className="text-sm space-y-1">
                    {member.name === '김개발' && (
                      <>
                        <li>• 업무 분산을 통한 워라밸 개선</li>
                        <li>• 최신 기술 트렌드 학습 시간 확보</li>
                        <li>• 다른 팀과의 협업 기회 확대</li>
                      </>
                    )}
                    {member.name === '이백엔드' && (
                      <>
                        <li>• 팀 리드 역할 경험 기회</li>
                        <li>• 프론트엔드 기술 스택 이해</li>
                        <li>• 외부 컨퍼런스 발표 기회</li>
                      </>
                    )}
                    {member.name === '박프론트' && (
                      <>
                        <li>• 백엔드 개발 경험 확대</li>
                        <li>• 풀스택 개발자로의 성장 지원</li>
                        <li>• 기술적 의사결정 참여 기회 확대</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
} 