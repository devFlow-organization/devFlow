import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Github, 
  User, 
  Building2, 
  GitBranch, 
  Calendar,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { UserProfile, JobType, TeamType } from '../types';
import { useUserProfile } from '../hooks/useUserProfile';

interface SignupPageProps {
  onComplete: (profile: UserProfile) => Promise<void>;
  onBack: () => void;
}

export default function SignupPage({ onComplete, onBack }: SignupPageProps) {
  const { availableTeams, availableRepositories, saveProfile } = useUserProfile();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    team: '',
    jobType: '' as JobType,
    repositories: [] as string[],
    hireDate: '',
    level: 'mid' as 'junior' | 'mid' | 'senior' | 'lead' | 'principal',
    skills: [] as string[]
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const jobTypes = [
    { value: 'frontend', label: '프론트엔드' },
    { value: 'backend', label: '백엔드' },
    { value: 'mobile', label: '모바일' },
    { value: 'ml-data', label: 'ML/데이터' },
    { value: 'devops', label: 'DevOps' },
    { value: 'other', label: '기타' }
  ];

  const levels = [
    { value: 'junior', label: '주니어 (1-3년)' },
    { value: 'mid', label: '미드레벨 (3-5년)' },
    { value: 'senior', label: '시니어 (5-8년)' },
    { value: 'lead', label: '리드 (8-12년)' },
    { value: 'principal', label: '프린시펄 (12년+)' }
  ];

  const skillOptions = [
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular',
    'Node.js', 'Python', 'Java', 'Go', 'Rust',
    'AWS', 'Docker', 'Kubernetes', 'Terraform',
    'Git', 'CI/CD', 'SQL', 'NoSQL', 'GraphQL'
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleComplete = async () => {
    const selectedTeam = availableTeams.find(t => t.id === formData.team);
    if (!selectedTeam) return;

    const selectedRepos = availableRepositories.filter(r => 
      formData.repositories.includes(r.full_name)
    );

    const profile: UserProfile = {
      id: Date.now().toString(),
      email: formData.email,
      name: formData.name,
      avatar_url: 'https://github.com/github.png',
      team: selectedTeam,
      jobType: formData.jobType,
      repositories: selectedRepos.map(repo => ({
        repository: repo,
        role: 'developer',
        joinedAt: new Date().toISOString(),
        isActive: true
      })),
      experience: {
        hireDate: formData.hireDate,
        yearsOfExperience: calculateYearsOfExperience(formData.hireDate),
        level: formData.level,
        skills: formData.skills
      },
      organization: {
        id: '1',
        name: 'Company',
        domain: 'company.com',
        industry: 'Technology'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveProfile(profile);
    await onComplete(profile);
  };

  const calculateYearsOfExperience = (hireDate: string) => {
    if (!hireDate) return 0;
    const hire = new Date(hireDate);
    const now = new Date();
    return Math.floor((now.getTime() - hire.getTime()) / (1000 * 60 * 60 * 24 * 365));
  };

  const handleRepositoryToggle = (repoFullName: string) => {
    setFormData(prev => ({
      ...prev,
      repositories: prev.repositories.includes(repoFullName)
        ? prev.repositories.filter(r => r !== repoFullName)
        : [...prev.repositories, repoFullName]
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="홍길동"
              />
            </div>
            <div>
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="user@company.com"
              />
            </div>
            <div>
              <Label>소속 팀</Label>
              <Select value={formData.team} onValueChange={(value) => setFormData(prev => ({ ...prev, team: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="팀을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {availableTeams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label>직무 유형</Label>
              <Select value={formData.jobType} onValueChange={(value) => setFormData(prev => ({ ...prev, jobType: value as JobType }))}>
                <SelectTrigger>
                  <SelectValue placeholder="직무를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((jobType) => (
                    <SelectItem key={jobType.value} value={jobType.value}>
                      {jobType.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>담당 레포지토리</Label>
              <div className="space-y-2 mt-2">
                {availableRepositories.map((repo) => (
                  <div key={repo.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`repo-${repo.id}`}
                      checked={formData.repositories.includes(repo.full_name)}
                      onCheckedChange={() => handleRepositoryToggle(repo.full_name)}
                    />
                    <Label htmlFor={`repo-${repo.id}`} className="flex-1">
                      <div className="flex items-center justify-between">
                        <span>{repo.full_name}</span>
                        <Badge variant="outline">{repo.language}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{repo.description}</p>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="hireDate">입사일</Label>
              <Input
                id="hireDate"
                type="date"
                value={formData.hireDate}
                onChange={(e) => setFormData(prev => ({ ...prev, hireDate: e.target.value }))}
              />
            </div>
            <div>
              <Label>경력 레벨</Label>
              <Select value={formData.level} onValueChange={(value) => setFormData(prev => ({ ...prev, level: value as any }))}>
                <SelectTrigger>
                  <SelectValue placeholder="경력 레벨을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>주요 기술 스택</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {skillOptions.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${skill}`}
                      checked={formData.skills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <Label htmlFor={`skill-${skill}`} className="text-sm">{skill}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">프로필 설정 완료!</h3>
              <p className="text-muted-foreground">입력하신 정보를 확인해주세요.</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">이름:</span>
                <span className="text-sm font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">이메일:</span>
                <span className="text-sm font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">팀:</span>
                <span className="text-sm font-medium">
                  {availableTeams.find(t => t.id === formData.team)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">직무:</span>
                <span className="text-sm font-medium">
                  {jobTypes.find(j => j.value === formData.jobType)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">담당 레포:</span>
                <span className="text-sm font-medium">{formData.repositories.length}개</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            <Github className="w-6 h-6" />
            <CardTitle>프로필 설정</CardTitle>
          </div>
          <CardDescription>
            더 정확한 분석을 위해 몇 가지 정보를 입력해주세요.
          </CardDescription>
          <Progress value={progress} className="mt-4" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>단계 {currentStep} / {totalSteps}</span>
            <span>{Math.round(progress)}% 완료</span>
          </div>
        </CardHeader>
        <CardContent>
          {renderStep()}
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              이전
            </Button>
            <Button onClick={handleNext} disabled={currentStep === 1 && (!formData.name || !formData.email || !formData.team)}>
              {currentStep === totalSteps ? '완료' : '다음'}
              {currentStep !== totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 