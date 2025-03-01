import axios from 'axios';
import { User } from '../types/user';

interface UserResponse {
  token: string;
  user: User;
}

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

export const register = async (
  username: string,
  password: string
): Promise<UserResponse> => {
  try {
    const response = await axios.post<UserResponse>(`${API_URL}`, {
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
  try {
    const response = await axios.post<UserResponse>(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getMe = async (): Promise<User> => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<User>(`${API_URL}/profile`, {
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
