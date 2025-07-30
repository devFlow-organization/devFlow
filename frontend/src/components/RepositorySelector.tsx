import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Github, 
  Search, 
  Star, 
  GitBranch, 
  Calendar,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { apiClient, API_CONFIG } from '../config/api';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  private: boolean;
  default_branch: string;
}

interface RepositorySelectorProps {
  onRepositorySelect: (repo: Repository) => void;
  accessToken: string;
  onLogout: () => void;
  userProfile?: any;
}

const RepositorySelector: React.FC<RepositorySelectorProps> = ({ 
  onRepositorySelect, 
  accessToken,
  onLogout,
  userProfile
}) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (accessToken) {
      fetchRepositories();
    }
  }, [accessToken]);

  useEffect(() => {
    const filtered = repositories.filter(repo =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRepos(filtered);
  }, [searchTerm, repositories]);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 실제 백엔드 API 호출
      const data = await apiClient.get(API_CONFIG.ENDPOINTS.REPOSITORIES, accessToken);
      setRepositories(data);
      setFilteredRepos(data);
      
    } catch (err) {
      console.error('Failed to fetch repositories:', err);
      
      // API 호출 실패 시 mock 데이터 사용 (개발용)
      if (API_CONFIG.ENV === 'development') {
        console.log('Using mock data for development');
        const mockRepositories: Repository[] = [
          {
            id: 1,
            name: 'developer-productivity-dashboard',
            full_name: 'user/developer-productivity-dashboard',
            description: '개발자 생산성 측정 및 분석 대시보드',
            language: 'TypeScript',
            stargazers_count: 15,
            forks_count: 3,
            updated_at: '2024-01-15T10:30:00Z',
            private: false,
            default_branch: 'main'
          },
          {
            id: 2,
            name: 'team-management-platform',
            full_name: 'user/team-management-platform',
            description: '팀 관리 및 협업 플랫폼',
            language: 'JavaScript',
            stargazers_count: 8,
            forks_count: 2,
            updated_at: '2024-01-10T14:20:00Z',
            private: true,
            default_branch: 'develop'
          },
          {
            id: 3,
            name: 'ai-code-analyzer',
            full_name: 'user/ai-code-analyzer',
            description: 'AI 기반 코드 분석 및 리팩토링 도구',
            language: 'Python',
            stargazers_count: 25,
            forks_count: 7,
            updated_at: '2024-01-12T09:15:00Z',
            private: false,
            default_branch: 'main'
          },
          {
            id: 4,
            name: 'devops-automation',
            full_name: 'user/devops-automation',
            description: 'DevOps 자동화 스크립트 및 도구',
            language: 'Shell',
            stargazers_count: 12,
            forks_count: 4,
            updated_at: '2024-01-08T16:45:00Z',
            private: false,
            default_branch: 'main'
          }
        ];
        
        setRepositories(mockRepositories);
        setFilteredRepos(mockRepositories);
      } else {
        setError('저장소 목록을 불러오는데 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-2xl">
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>저장소 목록을 불러오는 중...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchRepositories}>다시 시도</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">저장소 선택</h1>
            <p className="text-muted-foreground">분석할 GitHub 저장소를 선택해주세요</p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            로그아웃
          </Button>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="w-5 h-5" />
                저장소 목록
              </CardTitle>
              <CardDescription>
                선택한 저장소의 개발자 생산성 지표를 분석합니다.
              </CardDescription>
            </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="저장소 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid gap-4">
            {filteredRepos.map((repo) => (
              <Card 
                key={repo.id} 
                className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/20"
                onClick={() => onRepositorySelect(repo)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{repo.name}</h3>
                        {repo.private && (
                          <Badge variant="secondary" className="text-xs">
                            Private
                          </Badge>
                        )}
                      </div>
                      
                      {repo.description && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {repo.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {repo.language && (
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            {repo.language}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {repo.stargazers_count}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitBranch className="w-4 h-4" />
                          {repo.forks_count}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(repo.updated_at)}
                        </div>
                      </div>
                    </div>
                    
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredRepos.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? '검색 결과가 없습니다.' : '저장소가 없습니다.'}
            </div>
          )}
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  );
};

export default RepositorySelector; 