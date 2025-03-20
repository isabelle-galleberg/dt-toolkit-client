import api from './api';
import { ProblemStatement } from '../types/problemstatement';

const API_URL = '/problem-statement';

export const getProblemStatement = async (
  cardId: string
): Promise<ProblemStatement> => {
  try {
    const response = await api.get(`${API_URL}/${cardId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching problem statement:', error);
    throw error;
  }
};

export const upsertProblemStatement = async (
  problemStatementData: Partial<ProblemStatement>
): Promise<ProblemStatement> => {
  try {
    const response = await api.post(API_URL, problemStatementData);
    return response.data;
  } catch (error) {
    console.error('Error creating/updating problem statement:', error);
    throw error;
  }
};
