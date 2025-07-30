import { useState, useEffect } from 'react';
import { SurveyData } from '../types';

const SURVEY_STORAGE_KEY = 'developer-experience-survey';

export const useSurveyData = () => {
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 로컬 스토리지에서 설문조사 데이터 로드
  useEffect(() => {
    const savedData = localStorage.getItem(SURVEY_STORAGE_KEY);
    if (savedData) {
      try {
        setSurveyData(JSON.parse(savedData));
      } catch (error) {
        console.error('Failed to parse saved survey data:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // 설문조사 데이터 저장
  const saveSurveyData = (data: SurveyData) => {
    try {
      localStorage.setItem(SURVEY_STORAGE_KEY, JSON.stringify(data));
      setSurveyData(data);
      return true;
    } catch (error) {
      console.error('Failed to save survey data:', error);
      return false;
    }
  };

  // 설문조사 데이터 제출
  const submitSurvey = async (data: SurveyData) => {
    try {
      // 여기에 실제 API 호출 로직을 추가할 수 있습니다
      // const response = await apiClient.post('/surveys', data);
      
      // 임시로 로컬 스토리지에 저장
      const success = saveSurveyData(data);
      
      if (success) {
        // 제출 완료 표시를 위한 추가 플래그 저장
        localStorage.setItem(`${SURVEY_STORAGE_KEY}-submitted`, 'true');
        return { success: true };
      } else {
        return { success: false, error: 'Failed to save survey data' };
      }
    } catch (error) {
      console.error('Failed to submit survey:', error);
      return { success: false, error: 'Failed to submit survey' };
    }
  };

  // 설문조사 제출 여부 확인
  const isSurveySubmitted = () => {
    return localStorage.getItem(`${SURVEY_STORAGE_KEY}-submitted`) === 'true';
  };

  // 설문조사 데이터 초기화
  const resetSurvey = () => {
    localStorage.removeItem(SURVEY_STORAGE_KEY);
    localStorage.removeItem(`${SURVEY_STORAGE_KEY}-submitted`);
    setSurveyData(null);
  };

  return {
    surveyData,
    isLoading,
    saveSurveyData,
    submitSurvey,
    isSurveySubmitted,
    resetSurvey,
  };
}; 