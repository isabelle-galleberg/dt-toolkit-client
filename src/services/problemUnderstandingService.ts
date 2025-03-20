import api from './api';
import { ProblemUnderstanding } from '../types/problemunderstanding';

const API_URL = '/problem-understanding';

export const getProblemUnderstanding = async (
  cardId: string
): Promise<ProblemUnderstanding> => {
  try {
    const response = await api.get(`${API_URL}/${cardId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching problem understanding:', error);
    throw error;
  }
};

export const upsertProblemUnderstanding = async (
  cardId: string,
  whatHappened: string[],
  whyItHappened: string[],
  consequences: string[]
) => {
  try {
    const requestData = { cardId, whatHappened, whyItHappened, consequences };
    const response = await api.put(API_URL, requestData);
    return response.data;
  } catch (error) {
    console.error('Error creating/updating problem understanding:', error);
    throw error;
  }
};
