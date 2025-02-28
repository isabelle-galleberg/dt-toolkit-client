import axios from 'axios';
import { Feedback } from '../types/feedback';

const API_URL = `${import.meta.env.VITE_API_URL}/feedback`;

export const getFeedback = async (): Promise<Feedback[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<Feedback[]>(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};

export const addPositiveFeedback = async (
  positive: string[]
): Promise<Feedback> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post<Feedback>(
      `${API_URL}/positive`,
      { positive },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding positive feedback:', error);
    throw error;
  }
};

export const addImprovementFeedback = async (
  improvements: string[]
): Promise<Feedback> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post<Feedback>(
      `${API_URL}/improvement`,
      { improvements },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding improvement feedback:', error);
    throw error;
  }
};

export const deletePositiveFeedback = async (
  positive: string[]
): Promise<Feedback> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete<Feedback>(`${API_URL}/positive`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { positive },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting positive feedback:', error);
    throw error;
  }
};

export const deleteImprovementFeedback = async (
  improvements: string[]
): Promise<Feedback> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete<Feedback>(`${API_URL}/improvement`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { improvements },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting improvement feedback:', error);
    throw error;
  }
};
