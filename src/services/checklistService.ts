import api from './api';
import { ChecklistFeedback, ChecklistItem } from '../types/checklist';

const API_URL = '/checklist';

export const getChecklist = async (): Promise<ChecklistItem[]> => {
  try {
    const response = await api.get<ChecklistItem[]>(API_URL);
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
    const response = await api.post<ChecklistItem>(API_URL, { text });
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
    const response = await api.delete<{ message: string }>(`${API_URL}/${id}`);
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
    const response = await api.post<ChecklistFeedback>(`${API_URL}/feedback`, {
      checklist,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating feedback:', error);
    throw error;
  }
};
