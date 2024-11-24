import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.BACKEND_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true
});

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axiosInstance.post('/user/login', { email, password });
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Unable to login');
  }
};

export const signupUser = async (name: string, email: string, password: string) => {
  try {
    const res = await axiosInstance.post('/user/signup', { name, email, password });
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Unable to signup');
  }
};

export const checkAuthStatus = async () => {
  try {
    const res = await axiosInstance.get('/user/auth-status');
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Unable to authenticate');
  }
};

export const sendChatRequest = async (message: string) => {
  try {
    const res = await axiosInstance.post('/chat/new', { message });
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Unable to send chat request');
  }
};

export const getUserChats = async () => {
  try {
    const res = await axiosInstance.get('/chat/all-chats');
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Unable to retrieve chats');
  }
};

export const deleteUserChats = async () => {
  try {
    const res = await axiosInstance.delete('/chat/delete');
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Unable to delete chats');
  }
};

export const logoutUser = async () => {
  try {
    const res = await axiosInstance.get('/user/logout');
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Unable to logout user');
  }
};
