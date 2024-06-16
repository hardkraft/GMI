import { isServer, PORT } from './constants/env';

const envAwareFetch = (url: string, options?: Record<string, unknown>) => {
  const fetchUrl =
    isServer && url.startsWith('/') ? `http://localhost:${PORT}${url}` : url;

  return fetch(fetchUrl, options).then((res) => {
    if (res.status < 300 && res.ok) return res.json();
    return res;
  });
};

export { envAwareFetch as fetch };
