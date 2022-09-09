import { useState } from 'react';

interface ApiHookState<T, S> {
  data: T | null;
  loading: boolean;
  error: string;
  request: (args: S) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function useApi<T, S>(apiFunc: Function): ApiHookState<T, S> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  if (error) {
    throw error;
  }

  const request = async (args: S) => {
    setLoading(true);
    setError('');
    try {
      const result = await apiFunc(args);
      setData(result);
    } catch (err) {
      setError('Unexpected Error!');
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, request };
}

export default useApi;
