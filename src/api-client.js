import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

apiClient.interceptors.request.use(res => {
  const token = localStorage.getItem('authToken');
  return !token ? res : {
    ...res,
    headers: {
      ...res.headers,
      authorization: token,
    },
  };
});

apiClient.interceptors.response.use(res => res.data, ex => {
  if (ex.response.status === 401) localStorage.clear();
  else throw ex;
});

export default apiClient;
