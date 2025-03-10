import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/question-card`;

export const getQuestionCards = async (cardId: string) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { cardId },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching question cards:', error);
    throw error;
  }
};

export const addQuestionCard = async (
  cardId: string,
  question: string,
  answer: string
) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No authentication token found');
    }

    const requestData = { cardId, question, answer };
    console.log('Sending request data:', requestData);

    const response = await axios.post(API_URL, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error adding question card:', error);
    throw error;
  }
};

export const deleteQuestionCard = async (cardId: string) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.delete(`${API_URL}/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting question card:', error);
    throw error;
  }
};
