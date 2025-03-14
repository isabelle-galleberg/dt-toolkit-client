import api from './api';
import { User } from '../types/user';

interface UserResponse {
  token: string;
  user: User;
}

const API_URL = '/users';

export const register = async (
  username: string,
  password: string
): Promise<UserResponse> => {
  const response = await api.post<UserResponse>(API_URL, {
    username,
    password,
  });
  return response.data;
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
  const response = await api.get<User>('/profile');
  return response.data;
};
