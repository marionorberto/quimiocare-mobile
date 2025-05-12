import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../constants/data';
import api from '../api';

export const save = async (email: string, password: string): Promise<any> => {
  try {
    const response = (await api.post(`${API_URL}/tips/create/tip`, {
      description: 
      category:
      idDoctor: 
    }));
   
   return response.data;

  } catch(error: any) {
    if (error.response.message) throw error.response.message;
    throw error.response.data || 'Erro tentando fazer login!';
  } 
};
