import axios from 'axios';
import { ProblemStatement } from '../types/problemstatement';

const API_URL = `${import.meta.env.VITE_API_URL}/problem-statement`;

export const getProblemStatement = async (
  cardId: string
): Promise<ProblemStatement> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<ProblemStatement>(`${API_URL}/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const token = localStorage.getItem('token');
    const response = await axios.post<ProblemStatement>(
      API_URL,
      problemStatementData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating/updating problem statement:', error);
    throw error;
  }
};
