import axios from 'axios';

const baseURL = process.env.BACKEND_PORT

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    // You can add other headers as needed
  },
});

export const get = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error: any) {
    // Handle errors appropriately (e.g., logging, displaying a message)
    console.error(error.message);
  }
};

export const post = async (endpoint: string, data: any) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error: any) {
    // Handle errors appropriately (e.g., logging, displaying a message)
    console.error(error);
  }
};