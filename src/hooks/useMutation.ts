import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { useState } from 'react';

interface UseMutationProps<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<AxiosResponse<TData>>;
  onSuccess?: (data?: TData) => void;
  onError?: (errorMessage: string) => void;
}

const useMutation = <TData = unknown, TVariables = unknown>({
  mutationFn,
  onSuccess,
  onError,
}: UseMutationProps<TData, TVariables>) => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (variables: TVariables) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await mutationFn(variables);
      setData(res.data);
      onSuccess?.(res.data);
      return res.data;
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
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    mutate,
    data,
    error,
    isLoading,
    reset,
  };
};

export default useMutation;
