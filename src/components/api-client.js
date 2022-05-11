import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    accepts: 'application/json',
    'content-type': 'application/json',
  },
});

function doLogoutThingy() {
  const doThe = 'stuff';
}

apiClient.interceptors.response.use(res => res.data, ex => {
  if (ex.response.status === 401) doLogoutThingy();
  else throw ex;
});

export default apiClient;
