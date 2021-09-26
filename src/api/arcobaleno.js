import axios from 'axios';
import { URL } from '@env'

const arcobaleno = (session, config = {}) => {
  return axios.create({
    baseURL: URL,
    headers: {
      authorization: `Bearer ${session.token}`,
    },
    ...config,
  });
};

export default arcobaleno;
