import axios from 'axios';
import { API_URL } from '../../constants/data';

export const handleSaveDaily = async ( 
      painLevel: string,
      collateralEffect: string,
      sleepWell: boolean,
      emotionalState: string,
      hydratedToday: boolean,
      feedToday: boolean,
      exercicesToday: boolean,
      tiredLevelToday: string,
      note: string
    ): Promise<any> => {
  try {
    const response = (await axios.post(`${API_URL}/dailys/create/daily`, {
      painLevel,
      collateralEffect,
      sleepWell,
      emotionalState,
      hydratedToday,
      feedToday,
      exercicesToday,
      tiredLevelToday,
      note
    }));

    console.log(response.data);
 
    return response.data;

  } catch(error: any) {
    if (error.response.message) throw error.response.message;
    throw error.response.data || 'Erro tentando cadastrar daily!';
  } 
};
