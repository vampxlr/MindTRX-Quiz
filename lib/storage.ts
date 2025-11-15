/**
 * Client-side localStorage utilities for MINDTRX
 */

import { QuizAnswers, StoredResult } from './types';

const STORAGE_KEY = 'mindtrx_current_quiz';
const RESULTS_KEY = 'mindtrx_results';

export const storage = {
  // Current quiz in progress
  saveQuizProgress(answers: QuizAnswers) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  },

  getQuizProgress(): QuizAnswers | null {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  clearQuizProgress() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  // Completed results
  saveResult(result: StoredResult) {
    if (typeof window !== 'undefined') {
      const results = this.getAllResults();
      results[result.code] = result;
      localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
    }
  },

  getResult(code: string): StoredResult | null {
    if (typeof window !== 'undefined') {
      const results = this.getAllResults();
      return results[code] || null;
    }
    return null;
  },

  getAllResults(): { [code: string]: StoredResult } {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(RESULTS_KEY);
      return data ? JSON.parse(data) : {};
    }
    return {};
  },
};

