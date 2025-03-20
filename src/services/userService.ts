import api from './api';
import { User } from '../types/user';
import axios from 'axios';

interface UserResponse {
  token: string;
  user: User;
}

const API_URL = '/users';

export const register = async (
  username: string,
  password: string
): Promise<UserResponse> => {
  try {
    const response = await axios.post<UserResponse>(API_URL, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

export const login = async (
  username: string,
  password: string
): Promise<UserResponse> => {
  const response = await api.post<UserResponse>(`${API_URL}/login`, {
    username,
    password,
  });
  return response.data;
};

export const getMe = async (): Promise<User> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<User>(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updatePage = async (page: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    await axios.put(
      `${API_URL}/page`,
      { page },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error updating page:', error);
    throw error;
  }
};
