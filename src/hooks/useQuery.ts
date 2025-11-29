import axios from 'axios';
import { useEffect, useState } from 'react';

interface UseQueryType<TData, TParams = object> {
  fetchFn: (params?: TParams) => Promise<TData>;
  params?: TParams;
}

const useQuery = <TData, TParams = object>({ fetchFn, params }: UseQueryType<TData, TParams>) => {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const resData = await fetchFn(params);
      setData(resData);
    } catch (error: unknown) {
      let errorMessage = '알 수 없는 오류가 발생했습니다.';
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message;
        if (typeof message === 'string') {
          errorMessage = message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
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
