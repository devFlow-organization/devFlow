import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Users, 
  GitBranch, 
  TrendingUp, 
  Activity,
  Clock,
  Zap,
  Target,
  BarChart3,
  Building2
} from 'lucide-react';
import { useOrganizationData } from '../../hooks/useOrganizationData';

export default function OrganizationOverviewTab() {
  const { 
    organizationMetrics, 
    repositoryPerformance, 
    teamPerformance, 
    organizationTrends 
  } = useOrganizationData();

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-green-600';
    if (score >= 7.5) return 'text-blue-600';
    if (score >= 6.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 8.5) return 'default' as const;
    if (score >= 7.5) return 'secondary' as const;
    if (score >= 6.5) return 'outline' as const;
    return 'destructive' as const;
  };

  return (
    <div className="space-y-6">
      {/* 조직 전체 메트릭 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 레포지토리</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organizationMetrics.totalRepositories}</div>
            <p className="text-xs text-muted-foreground">
              활성 프로젝트
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 개발자</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organizationMetrics.totalDevelopers}</div>
            <p className="text-xs text-muted-foreground">
              활성 개발자
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 커밋</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organizationMetrics.totalCommits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              이번 달
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 PR</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organizationMetrics.totalPullRequests}</div>
            <p className="text-xs text-muted-foreground">
              이번 달
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 평균 성과 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              평균 생산성 점수
            </CardTitle>
            <CardDescription>조직 전체 개발자 생산성</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl font-bold text-green-600">
                {organizationMetrics.averageProductivityScore}/10
              </div>
              <Badge variant={getScoreBadgeVariant(organizationMetrics.averageProductivityScore)}>
                우수
              </Badge>
            </div>
            <Progress value={organizationMetrics.averageProductivityScore * 10} className="w-full" />
            <p className="text-xs text-muted-foreground mt-2">
              지난 달 대비 +0.3점 향상
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              평균 팀 건강도
            </CardTitle>
            <CardDescription>조직 전체 팀 건강도</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl font-bold text-blue-600">
                {organizationMetrics.averageHealthScore}/10
              </div>
              <Badge variant={getScoreBadgeVariant(organizationMetrics.averageHealthScore)}>
                양호
              </Badge>
            </div>
            <Progress value={organizationMetrics.averageHealthScore * 10} className="w-full" />
            <p className="text-xs text-muted-foreground mt-2">
              지난 달 대비 +0.2점 향상
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              평균 효율성 점수
            </CardTitle>
            <CardDescription>조직 전체 개발 효율성</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl font-bold text-purple-600">
                {organizationMetrics.averageEfficiencyScore}/10
              </div>
              <Badge variant={getScoreBadgeVariant(organizationMetrics.averageEfficiencyScore)}>
                양호
              </Badge>
            </div>
            <Progress value={organizationMetrics.averageEfficiencyScore * 10} className="w-full" />
            <p className="text-xs text-muted-foreground mt-2">
              지난 달 대비 +0.4점 향상
            </p>
          </CardContent>
        </Card>
      </div>

      {/* DORA 메트릭 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            DORA 메트릭 (조직 평균)
          </CardTitle>
          <CardDescription>개발 및 운영 성과 지표</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {organizationMetrics.averageDeploymentFrequency}
              </div>
              <div className="text-sm text-muted-foreground">배포 빈도</div>
              <div className="text-xs text-green-600">회/일</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {organizationMetrics.averageLeadTime}
              </div>
              <div className="text-sm text-muted-foreground">리드 타임</div>
              <div className="text-xs text-blue-600">일</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {organizationMetrics.averageReviewTime}
              </div>
              <div className="text-sm text-muted-foreground">평균 리뷰 시간</div>
              <div className="text-xs text-purple-600">시간</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {organizationMetrics.averageChangeFailureRate}%
              </div>
              <div className="text-sm text-muted-foreground">변경 실패율</div>
              <div className="text-xs text-orange-600">낮을수록 좋음</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 팀별 성과 */}
      <Card>
        <CardHeader>
          <CardTitle>팀별 성과 비교</CardTitle>
          <CardDescription>각 팀의 평균 성과 지표</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamPerformance.map((team) => (
              <div key={team.teamName} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-semibold">{team.teamName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {team.memberCount}명 • {team.repositories.length}개 레포
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getScoreColor(team.averageMetrics.productivityScore)}`}>
                      {team.averageMetrics.productivityScore}
                    </div>
                    <div className="text-xs text-muted-foreground">생산성</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getScoreColor(team.averageMetrics.healthScore)}`}>
                      {team.averageMetrics.healthScore}
                    </div>
                    <div className="text-xs text-muted-foreground">건강도</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getScoreColor(team.averageMetrics.efficiencyScore)}`}>
                      {team.averageMetrics.efficiencyScore}
                    </div>
                    <div className="text-xs text-muted-foreground">효율성</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 레포지토리 성과 */}
      <Card>
        <CardHeader>
          <CardTitle>레포지토리별 성과</CardTitle>
          <CardDescription>각 레포지토리의 상세 성과 지표</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {repositoryPerformance.map((repo) => (
              <div key={repo.repository.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{repo.repository.full_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {repo.repository.description} • {repo.teamSize}명
                    </p>
                  </div>
                  <Badge variant="outline">{repo.repository.language}</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getScoreColor(repo.metrics.productivityScore)}`}>
                      {repo.metrics.productivityScore}
                    </div>
                    <div className="text-xs text-muted-foreground">생산성</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {repo.metrics.commitCount}
                    </div>
                    <div className="text-xs text-muted-foreground">커밋</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {repo.metrics.pullRequestCount}
                    </div>
                    <div className="text-xs text-muted-foreground">PR</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">
                      {repo.metrics.averageReviewTime}h
                    </div>
                    <div className="text-xs text-muted-foreground">평균 리뷰</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 