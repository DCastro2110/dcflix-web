import axios from 'axios';

export const dcflixApi = axios.create({
  baseURL: import.meta.env.DCFLIX_API_BASE_URL,
  timeout: 20000,
  timeoutErrorMessage:
    'Tempo de requisição esgotado. Tente novamente mais tarde!',
});
