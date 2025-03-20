import axios, { AxiosResponse } from 'axios';
import { ChecklistFeedback, ChecklistItem } from '../types/checklist';

const API_URL = `${import.meta.env.VITE_API_URL}/checklist`;

export const getChecklist = async (): Promise<ChecklistItem[]> => {
  try {
    const response: AxiosResponse<ChecklistItem[]> = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching checklist:', error);
    throw error;
  }
};

export const addChecklistItem = async (
  text: string
): Promise<ChecklistItem> => {
  try {
    const response: AxiosResponse<ChecklistItem> = await axios.post(
      API_URL,
      { text },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding checklist item:', error);
    throw error;
  }
};

export const deleteChecklistItem = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const response: AxiosResponse<{ message: string }> = await axios.delete(
      `${API_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting checklist item:', error);
    throw error;
  }
};

export const handleChecklistFeedback = async (
  checklist: string[]
): Promise<ChecklistFeedback> => {
  try {
    const response: AxiosResponse<ChecklistFeedback> = await axios.post(
      `${API_URL}/feedback`,
      { checklist },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error generating feedback:', error);
    throw error;
  }
};
