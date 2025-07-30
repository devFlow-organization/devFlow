import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Settings, Users, BarChart3 } from 'lucide-react';
import AdminTab from './tabs/AdminTab';

interface AdminPageProps {
  onBack: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  onBack,
}) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              대시보드로 돌아가기
            </Button>
            <div>
              <h1 className="text-3xl font-bold">관리자 페이지</h1>
              <p className="text-muted-foreground">설문조사 캠페인 및 조직 관리</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              관리자 모드
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              관리자
            </Badge>
          </div>
        </div>

        {/* 관리자 콘텐츠 */}
        <AdminTab />
      </div>
    </div>
  );
}; 