import axios from 'axios';
import { useEffect, useState } from 'react';

interface UseQueryType<TData, TParams = object> {
  fetchFn: (params?: TParams) => Promise<TData>;
  params?: TParams;
}

const useQuery = <TData, TParams = object>({ fetchFn, params }: UseQueryType<TData, TParams>) => {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const resData = await fetchFn(params);
      setData(resData);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
      } else {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(params)]);

  return { data, isLoading, error, refetch: fetchData };
};

export default useQuery;
