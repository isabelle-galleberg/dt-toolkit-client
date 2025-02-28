import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://dt-webapp-e6b8gxbjhbamb7fu.westeurope-01.azurewebsites.net/api/todo'
    : `${import.meta.env.VITE_API_URL}/todo`;

console.log('API_URL:', API_URL);

export const getTodos = async (): Promise<any[]> => {
  try {
    const response = await axios.get<any[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const addTodo = async (task: string): Promise<any> => {
  try {
    const response = await axios.post<any>(API_URL, { task });
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};
