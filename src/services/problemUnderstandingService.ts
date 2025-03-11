import axios from 'axios';
import { ProblemUnderstanding } from '../types/problemunderstanding';

const API_URL = `${import.meta.env.VITE_API_URL}/problem-understanding`;

export const getProblemUnderstanding = async (
  cardId: string
): Promise<ProblemUnderstanding> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<ProblemUnderstanding>(
      `${API_URL}/${cardId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No authentication token found');
    }

    const requestData = { cardId, whatHappened, whyItHappened, consequences };
    const response = await axios.put(API_URL, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating/updating problem understanding:', error);
    throw error;
  }
};
