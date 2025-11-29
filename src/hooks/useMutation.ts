import type { AxiosResponse } from 'axios';
import { useState } from 'react';

interface UseMutationProps<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<AxiosResponse<TData>>;
  onSuccess?: (data?: TData) => void;
  onError?: (error: unknown) => void;
}

const useMutation = <TData = unknown, TVariables = unknown>({
  mutationFn,
  onSuccess,
  onError,
}: UseMutationProps<TData, TVariables>) => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (variables: TVariables) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await mutationFn(variables);
      setData(res.data);
      onSuccess?.(res.data);
      return res.data;
    } catch (err) {
      setError(err);
      onError?.(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    data,
    error,
    isLoading,
  };
};

export default useMutation;
