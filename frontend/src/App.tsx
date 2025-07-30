import React from 'react';
import { useAppState } from './hooks/useAppState';
import { useAdminAuth } from './hooks/useAdminAuth';
import GitHubLogin from './components/GitHubLogin';
import RepositorySelector from './components/RepositorySelector';
import { AppHeader } from './components/layout/AppHeader';
import { TabNavigation } from './components/layout/TabNavigation';
import { TabContent } from './components/layout/TabContent';
import { AdminPage } from './components/AdminPage';
import SignupPage from './components/SignupPage';

function App() {
  const {
    appState,
    activeTab,
    selectedRepository,
    accessToken,
    userProfile,
    handleLoginSuccess,
    handleRepositorySelect,
    handleTabChange,
    handleBackToRepos,
    handleLogout,
    handleGoToAdmin,
    handleBackFromAdmin,
    handleSignupComplete,
    handleBackFromSignup
  } = useAppState();

  const { isAdmin } = useAdminAuth();

  // 로그인 페이지
  if (appState === 'login') {
    return <GitHubLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // 회원가입 페이지
  if (appState === 'signup') {
    return (
      <SignupPage
        onComplete={handleSignupComplete}
        onBack={handleBackFromSignup}
      />
    );
  }

  // 관리자 페이지
  if (appState === 'admin') {
    return (
      <AdminPage
        onBack={handleBackFromAdmin}
      />
    );
  }

  // 레포지토리 선택 페이지
  if (appState === 'select-repo') {
    return (
      <RepositorySelector
        accessToken={accessToken!}
        onRepositorySelect={handleRepositorySelect}
        onLogout={handleLogout}
        userProfile={userProfile}
      />
    );
  }

  // 대시보드 페이지
  if (appState === 'dashboard' && selectedRepository) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader
          selectedRepository={selectedRepository}
          onBackToRepos={handleBackToRepos}
          onTabChange={handleTabChange}
          onLogout={handleLogout}
          onGoToAdmin={isAdmin ? handleGoToAdmin : undefined}
          showBackButton={true}
        />
        <div className="container mx-auto px-4 py-6">
          <TabNavigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
          <div className="mt-6">
            <TabContent
              activeTab={activeTab}
              selectedRepository={selectedRepository}
              onTabChange={handleTabChange}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;