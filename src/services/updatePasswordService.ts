import axios from 'axios';
import { API_URL } from '../constants/data';

export const handleUpdatePassword = async (
    atualPassword: string,
    newPassword: string,
  ): Promise<any> => {
  try { 

    const response = await axios.put(`${API_URL}/password/update/user`, {
      atualPassword,
      newPassword,
     });

    return response.data;

  } catch(error: any) {
    throw error.response.data || 'Erro tentando atualizar a password!';
  }

};

