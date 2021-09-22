import axios from 'axios';
import { URL } from '@env'

const arcobaleno = (session, config = {}) => {
  return axios.create({
    baseURL: URL,
    headers: {
      authorization: `Bearer ${session.ADMIN_TOKEN}`,
    },
    ...config,
  });
};
''
export default arcobaleno;
