import React from 'react';
import { 
  BarChart3,
  Heart,
  Brain,
  Target,
  Zap,
  Eye,
  ClipboardList,
} from 'lucide-react';
import { TabType } from '../../types';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isAdmin?: boolean;
}

const TAB_CONFIG = [
  { id: 'metrics' as TabType, label: '핵심 지표', icon: BarChart3 },
  { id: 'team-health' as TabType, label: '팀 건강도', icon: Heart },
  { id: 'intelligence' as TabType, label: 'AI 인텔리전스', icon: Brain },
  { id: 'actions' as TabType, label: '액션 플랜', icon: Target },
  { id: 'efficiency' as TabType, label: '효율성 분석', icon: Zap },
  { id: 'context' as TabType, label: '맥락 관찰', icon: Eye },
  { id: 'survey' as TabType, label: '설문조사', icon: ClipboardList },
];

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="grid w-full grid-cols-7 gap-2">
      {TAB_CONFIG.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === id 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}; 