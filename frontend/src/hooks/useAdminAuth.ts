import { useState, useEffect } from 'react';
import { User } from '../types';

// 임시 관리자 이메일 목록 (실제로는 서버에서 관리)
const ADMIN_EMAILS = [
  'admin@company.com',
  'manager@company.com',
  'devops@company.com'
];

export const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 임시로 관리자 권한을 true로 설정 (개발용)
    setIsAdmin(true);
    setIsLoading(false);
  }, []);

  return {
    isAdmin,
    isLoading,
  };
}; 