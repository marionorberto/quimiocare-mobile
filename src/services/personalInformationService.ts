import axios from 'axios';
import { API_URL } from '../constants/data';

export const createPersonalInformations = async (
    countryName: string,
    birthday: string,
    bio: string,
    job: string,
    phoneNumber: string,
    sex: string,
    address: string,
    urlImg: string,
    tag: string
  ): Promise<any> => {
  try { 

    const response = await axios.post(`${API_URL}/profiles/create/profile`, {
      countryName,
      birthday,
      bio,
      job,
	    phoneNumber,
	    sex,
	    address,
 	    urlImg,
      tags: [
		    {
			    description: tag
		    }
	    ]
     }  );

    return response.data;

  } catch(error: any) {
    throw error.response.data || 'Erro tentando cadastrar o perfil!';
  }

};

