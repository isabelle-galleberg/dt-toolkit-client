import api from './api';

const API_URL = '/ai-feedback';

export const getAiFeedback = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};

export const updateAiFeedback = async (
  strengths: string,
  improvements: string
) => {
  try {
    const requestData = { strengths, improvements };
    const response = await api.put(API_URL, requestData);
    return response.data;
  } catch (error) {
    console.error('Error updating test results:', error);
    throw error;
  }
};
