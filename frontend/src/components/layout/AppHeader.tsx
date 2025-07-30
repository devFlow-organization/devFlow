import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Github, ArrowLeft, Activity, Gauge, Settings } from 'lucide-react';
import { Repository, TabType } from '../../types';

interface AppHeaderProps {
  selectedRepository: Repository | null;
  onBackToRepos: () => void;
  onTabChange: (tab: TabType) => void;
  onLogout: () => void;
  onGoToAdmin?: () => void;
  showBackButton?: boolean;
  isAdmin?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  selectedRepository,
  onBackToRepos,
  onTabChange,
  onLogout,
  onGoToAdmin,
  showBackButton = false,
  isAdmin = false,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBackToRepos}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            저장소 변경
          </Button>
        )}
        <div>
          {selectedRepository && (
            <div className="flex items-center gap-2 mb-1">
              <Github className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">
                {selectedRepository.full_name}
              </span>
            </div>
          )}
          <h1>개발자 생산성 AI 대시보드</h1>
          <p className="text-muted-foreground">
            정량적 지표와 정성적 관찰을 통합한 맥락 기반 팀 관리
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Badge 
          variant="outline" 
          className="flex items-center gap-2 cursor-pointer hover:bg-accent transition-colors"
          onClick={() => onTabChange("team-health")}
        >
          <Activity className="w-4 h-4" />
          팀 건강도: 85%
        </Badge>
        <Badge 
          variant="outline" 
          className="flex items-center gap-2 cursor-pointer hover:bg-accent transition-colors"
          onClick={() => onTabChange("metrics")}
        >
          <Gauge className="w-4 h-4" />
          생산성 점수: 87
        </Badge>
        {isAdmin && onGoToAdmin && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onGoToAdmin}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            관리자
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={onLogout}>
          로그아웃
        </Button>
      </div>
    </div>
  );
}; 