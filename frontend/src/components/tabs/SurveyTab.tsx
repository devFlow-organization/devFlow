import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  ClipboardList, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Users,
  Wrench,
  BarChart3,
  Smile
} from 'lucide-react';
import { 
  SurveyData, 
  JobType, 
  TeamType, 
  SatisfactionLevel, 
  FocusTime, 
  BuildTime, 
  ReviewTime, 
  FailureCount 
} from '../../types';
import { useSurveyData } from '../../hooks/useSurveyData';

const JOB_TYPES = [
  { value: 'frontend', label: '프론트엔드' },
  { value: 'backend', label: '백엔드' },
  { value: 'mobile', label: '모바일' },
  { value: 'ml-data', label: 'ML/데이터' },
  { value: 'devops', label: 'DevOps' },
  { value: 'other', label: '기타' }
];

const TEAM_TYPES = [
  { value: 'product', label: '프로덕트 개발팀' },
  { value: 'infrastructure', label: '인프라팀' },
  { value: 'platform', label: '플랫폼팀' },
  { value: 'experiment', label: '실험/테스트팀' },
  { value: 'other', label: '기타' }
];

const INTERRUPTIONS = [
  '잦은 회의',
  '잦은 요청/DM',
  '빌드 시간 지연',
  '코드 리뷰 병목',
  '배포 실패/불안정성'
];

const FOCUS_TIME_OPTIONS = [
  { value: 'under-1h', label: '1시간 미만' },
  { value: '1-3h', label: '1-3시간' },
  { value: '3-5h', label: '3-5시간' },
  { value: 'over-5h', label: '5시간 이상' }
];

const BUILD_TIME_OPTIONS = [
  { value: 'under-30s', label: '30초 이하' },
  { value: 'under-1m', label: '1분 미만' },
  { value: '1-3m', label: '1~3분' },
  { value: 'over-3m', label: '3분 이상' }
];

const REVIEW_TIME_OPTIONS = [
  { value: 'under-1h', label: '1시간 미만' },
  { value: 'half-day', label: '반나절 이내' },
  { value: '1-day', label: '1일 이상' },
  { value: '2-days', label: '2일 이상' }
];

const FAILURE_COUNT_OPTIONS = [
  { value: '0', label: '0회' },
  { value: '1-2', label: '1-2회' },
  { value: '3-5', label: '3-5회' },
  { value: 'over-5', label: '5회 이상' }
];

const initialSurveyData: SurveyData = {
  jobType: 'frontend',
  teamType: 'product',
  editorSatisfaction: 3,
  localEnvironmentSatisfaction: 3,
  codeReviewSatisfaction: 3,
  cicdSatisfaction: 3,
  deploymentSatisfaction: 3,
  monitoringSatisfaction: 3,
  focusTime: '3-5h',
  interruptions: [],
  collaborationSatisfaction: 3,
  toolSatisfaction: 3,
  buildTime: '1-3m',
  reviewTime: 'half-day',
  failureCount: '1-2',
  overallSatisfaction: 3,
  improvementSuggestions: '',
  positiveFeedback: '',
  nsatScore: 5
};

export default function SurveyTab() {
  const { surveyData: savedData, submitSurvey, isSurveySubmitted } = useSurveyData();
  const [surveyData, setSurveyData] = useState<SurveyData>(savedData || initialSurveyData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(isSurveySubmitted());
  const [otherInterruption, setOtherInterruption] = useState('');

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const updateSurveyData = (updates: Partial<SurveyData>) => {
    setSurveyData(prev => ({ ...prev, ...updates }));
  };

  const handleInterruptionChange = (interruption: string, checked: boolean) => {
    if (checked) {
      updateSurveyData({ 
        interruptions: [...surveyData.interruptions, interruption] 
      });
    } else {
      updateSurveyData({ 
        interruptions: surveyData.interruptions.filter(i => i !== interruption) 
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await submitSurvey(surveyData);
      if (result.success) {
        setIsSubmitted(true);
      } else {
        console.error('Failed to submit survey:', result.error);
        // 에러 처리 로직 추가 가능
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  const SatisfactionQuestion = ({ 
    title, 
    value, 
    onChange 
  }: { 
    title: string; 
    value: SatisfactionLevel; 
    onChange: (value: SatisfactionLevel) => void; 
  }) => (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{title}</Label>
      <RadioGroup value={value.toString()} onValueChange={(v) => onChange(parseInt(v) as SatisfactionLevel)}>
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <RadioGroupItem value={level.toString()} id={`${title}-${level}`} />
              <Label htmlFor={`${title}-${level}`} className="text-sm">{level}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>매우 불만족</span>
        <span>매우 만족</span>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                기본 정보
              </CardTitle>
              <CardDescription>담당 업무와 소속 팀 정보를 알려주세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">담당 업무 유형을 선택해 주세요.</Label>
                <RadioGroup value={surveyData.jobType} onValueChange={(v) => updateSurveyData({ jobType: v as JobType })}>
                  {JOB_TYPES.map((job) => (
                    <div key={job.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={job.value} id={`job-${job.value}`} />
                      <Label htmlFor={`job-${job.value}`} className="text-sm">{job.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">현재 소속된 팀은 다음 중 어디에 가까운가요?</Label>
                <RadioGroup value={surveyData.teamType} onValueChange={(v) => updateSurveyData({ teamType: v as TeamType })}>
                  {TEAM_TYPES.map((team) => (
                    <div key={team.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={team.value} id={`team-${team.value}`} />
                      <Label htmlFor={`team-${team.value}`} className="text-sm">{team.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
                          <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              개발 도구 및 환경 만족도
            </CardTitle>
              <CardDescription>아래 항목들은 모두 "1점 = 매우 불만족, 5점 = 매우 만족"으로 응답해 주세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SatisfactionQuestion
                title="사용하는 코드 에디터/IDE의 성능 및 안정성에 만족하십니까?"
                value={surveyData.editorSatisfaction}
                onChange={(value) => updateSurveyData({ editorSatisfaction: value })}
              />
              <SatisfactionQuestion
                title="현재 로컬 개발 환경(빌드 속도, 실행 속도 등)에 얼마나 만족하시나요?"
                value={surveyData.localEnvironmentSatisfaction}
                onChange={(value) => updateSurveyData({ localEnvironmentSatisfaction: value })}
              />
              <SatisfactionQuestion
                title="코드 리뷰 및 PR 병합 프로세스는 원활하게 작동하나요?"
                value={surveyData.codeReviewSatisfaction}
                onChange={(value) => updateSurveyData({ codeReviewSatisfaction: value })}
              />
              <SatisfactionQuestion
                title="현재 사용하는 CI/CD 파이프라인의 속도 및 신뢰도는 어떤가요?"
                value={surveyData.cicdSatisfaction}
                onChange={(value) => updateSurveyData({ cicdSatisfaction: value })}
              />
              <SatisfactionQuestion
                title="배포 과정(프로덕션 반영 등)은 예측 가능하고 안정적인가요?"
                value={surveyData.deploymentSatisfaction}
                onChange={(value) => updateSurveyData({ deploymentSatisfaction: value })}
              />
              <SatisfactionQuestion
                title="로그 및 모니터링 시스템을 통해 문제를 빠르게 진단할 수 있나요?"
                value={surveyData.monitoringSatisfaction}
                onChange={(value) => updateSurveyData({ monitoringSatisfaction: value })}
              />
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                생산성 및 협업 경험
              </CardTitle>
              <CardDescription>개발 생산성과 협업 환경에 대해 알려주세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">하루 평균 몇 시간 정도 몰입해서 코딩하실 수 있나요?</Label>
                <RadioGroup value={surveyData.focusTime} onValueChange={(v) => updateSurveyData({ focusTime: v as FocusTime })}>
                  {FOCUS_TIME_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`focus-${option.value}`} />
                      <Label htmlFor={`focus-${option.value}`} className="text-sm">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">최근 2주 동안 작업에 방해가 되는 요소가 있었다면 무엇이었나요? (복수 선택 가능)</Label>
                <div className="space-y-2">
                  {INTERRUPTIONS.map((interruption) => (
                    <div key={interruption} className="flex items-center space-x-2">
                      <Checkbox
                        id={`interruption-${interruption}`}
                        checked={surveyData.interruptions.includes(interruption)}
                        onCheckedChange={(checked) => handleInterruptionChange(interruption, checked as boolean)}
                      />
                      <Label htmlFor={`interruption-${interruption}`} className="text-sm">{interruption}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="interruption-other"
                      checked={surveyData.interruptions.includes('기타')}
                      onCheckedChange={(checked) => handleInterruptionChange('기타', checked as boolean)}
                    />
                    <Label htmlFor="interruption-other" className="text-sm">기타:</Label>
                    <input
                      type="text"
                      value={otherInterruption}
                      onChange={(e) => setOtherInterruption(e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border rounded"
                      placeholder="기타 방해 요소"
                    />
                  </div>
                </div>
              </div>

              <SatisfactionQuestion
                title="동료들과의 협업(코드 리뷰, 문서화, 회의 등)은 원활하다고 느끼시나요?"
                value={surveyData.collaborationSatisfaction}
                onChange={(value) => updateSurveyData({ collaborationSatisfaction: value })}
              />

              <SatisfactionQuestion
                title="현재 사용하는 협업 도구(Slack, Notion, GitHub 등)는 목적에 부합하나요?"
                value={surveyData.toolSatisfaction}
                onChange={(value) => updateSurveyData({ toolSatisfaction: value })}
              />
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                시스템 기반 지표 체감도
              </CardTitle>
              <CardDescription>실제 경험한 시스템 성능에 대해 알려주세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">최근 1개월 기준, 로컬 빌드 시간이 평균적으로 얼마 정도 걸리나요?</Label>
                <RadioGroup value={surveyData.buildTime} onValueChange={(v) => updateSurveyData({ buildTime: v as BuildTime })}>
                  {BUILD_TIME_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`build-${option.value}`} />
                      <Label htmlFor={`build-${option.value}`} className="text-sm">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">코드 리뷰 요청 이후 첫 피드백까지 평균 몇 시간이 걸리나요?</Label>
                <RadioGroup value={surveyData.reviewTime} onValueChange={(v) => updateSurveyData({ reviewTime: v as ReviewTime })}>
                  {REVIEW_TIME_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`review-${option.value}`} />
                      <Label htmlFor={`review-${option.value}`} className="text-sm">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">최근 1개월간 배포 실패를 경험한 횟수는 몇 회인가요?</Label>
                <RadioGroup value={surveyData.failureCount} onValueChange={(v) => updateSurveyData({ failureCount: v as FailureCount })}>
                  {FAILURE_COUNT_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`failure-${option.value}`} />
                      <Label htmlFor={`failure-${option.value}`} className="text-sm">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smile className="w-5 h-5" />
                종합 만족도 및 개선 제안
              </CardTitle>
              <CardDescription>전체적인 개발 경험에 대한 의견을 들려주세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SatisfactionQuestion
                title="현재 전체 개발 경험(도구, 환경, 협업 포함)에 대한 만족도를 평가해주세요."
                value={surveyData.overallSatisfaction}
                onChange={(value) => updateSurveyData({ overallSatisfaction: value })}
              />

              <div className="space-y-3">
                <Label className="text-sm font-medium">지금 가장 개선되었으면 하는 부분은 무엇인가요?</Label>
                <Textarea
                  value={surveyData.improvementSuggestions}
                  onChange={(e) => updateSurveyData({ improvementSuggestions: e.target.value })}
                  placeholder="개선하고 싶은 부분을 자유롭게 작성해주세요..."
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">가장 만족스러운 점은 무엇인가요?</Label>
                <Textarea
                  value={surveyData.positiveFeedback}
                  onChange={(e) => updateSurveyData({ positiveFeedback: e.target.value })}
                  placeholder="만족스러운 점을 자유롭게 작성해주세요..."
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">개발 시스템에 대해 전반적으로 얼마나 만족하십니까?</Label>
                <RadioGroup value={surveyData.nsatScore?.toString() || '5'} onValueChange={(v) => updateSurveyData({ nsatScore: parseInt(v) })}>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                      <div key={score} className="flex items-center space-x-2">
                        <RadioGroupItem value={score.toString()} id={`nsat-${score}`} />
                        <Label htmlFor={`nsat-${score}`} className="text-sm">{score}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>전혀 만족하지 않음</span>
                  <span>매우 만족함</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                설문조사 완료
              </CardTitle>
              <CardDescription>응답해주셔서 감사합니다!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl">🎉</div>
                <h3 className="text-xl font-semibold">설문조사가 완료되었습니다</h3>
                <p className="text-muted-foreground">
                  귀하의 소중한 의견이 개발자 경험 개선에 큰 도움이 될 것입니다.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">응답 요약</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">담당 업무:</span>
                    <span className="ml-2">{JOB_TYPES.find(j => j.value === surveyData.jobType)?.label}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">소속 팀:</span>
                    <span className="ml-2">{TEAM_TYPES.find(t => t.value === surveyData.teamType)?.label}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">전체 만족도:</span>
                    <span className="ml-2">{surveyData.overallSatisfaction}/5</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">NSAT 점수:</span>
                    <span className="ml-2">{surveyData.nsatScore}/10</span>
                  </div>
                </div>
              </div>

              <Button onClick={handleSubmit} className="w-full">
                설문조사 제출하기
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              설문조사 제출 완료
            </CardTitle>
            <CardDescription>소중한 의견을 보내주셔서 감사합니다!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-6xl">✅</div>
              <p className="text-muted-foreground">
                설문조사가 성공적으로 제출되었습니다. 
                응답하신 내용은 개발자 경험 개선을 위해 활용됩니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 진행률 표시 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5" />
              Developer Experience 설문조사
            </CardTitle>
            <Badge variant="outline">약 10분 소요</Badge>
          </div>
          <CardDescription>
            개발자 경험 개선을 위한 설문조사입니다. 솔직한 의견을 들려주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>진행률</span>
              <span>{currentStep}/{totalSteps}</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* 현재 단계 렌더링 */}
      {renderStep()}

      {/* 네비게이션 버튼 */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          이전
        </Button>
        
        {currentStep < totalSteps ? (
          <Button onClick={() => setCurrentStep(currentStep + 1)}>
            다음
          </Button>
        ) : (
          <Button onClick={() => setCurrentStep(currentStep + 1)}>
            완료
          </Button>
        )}
      </div>
    </div>
  );
} 