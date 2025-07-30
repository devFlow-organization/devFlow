import React from 'react';
import { TabType } from '../../types';
import MetricsTab from '../tabs/MetricsTab';
import TeamHealthTab from '../tabs/TeamHealthTab';
import AIIntelligenceTab from '../tabs/AIIntelligenceTab';
import ActionPlanTab from '../tabs/ActionPlanTab';
import EfficiencyTab from '../tabs/EfficiencyTab';
import ContextTab from '../tabs/ContextTab';
import SurveyTab from '../tabs/SurveyTab';

interface TabContentProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  selectedRepository?: any;
}

export const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  onTabChange,
  selectedRepository,
}) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'intelligence':
        return <AIIntelligenceTab />;
      case 'metrics':
        return <MetricsTab onTabChange={onTabChange} />;
      case 'team-health':
        return <TeamHealthTab />;
      case 'efficiency':
        return <EfficiencyTab />;
      case 'context':
        return <ContextTab />;
      case 'actions':
        return <ActionPlanTab />;
      case 'survey':
        return <SurveyTab />;
      default:
        return <MetricsTab onTabChange={onTabChange} />;
    }
  };

  return <div>{renderTabContent()}</div>;
}; 