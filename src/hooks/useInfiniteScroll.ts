import { useState, useEffect, useRef } from 'react';

interface InfiniteScrollResType {
  cursorId?: number | null | undefined;
}
interface UseInfiniteScrollType<TData extends InfiniteScrollResType, TParams = object> {
  fetchFn: (params: TParams & { cursorId?: number | null }) => Promise<TData>;
  params: TParams;
  onSuccess: (prevData: TData | null, newData: TData) => TData;
}

const useInfiniteScroll = <TData extends InfiniteScrollResType, TParams = object>({
  fetchFn,
  params,
  onSuccess,
}: UseInfiniteScrollType<TData, TParams>) => {
  const [data, setData] = useState<TData | null>(null);
  const [cursor, setCursor] = useState<undefined | number | null>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const obseverRef = useRef<null | IntersectionObserver>(null);
  //li 태그에 ref 연결해야함..
  const lastItemRef = useRef<HTMLLIElement>(null);
  const initLoadRef = useRef<boolean>(true);
  const isFetchRef = useRef<boolean>(false);

  const fetchData = async () => {
    if (isFetchRef.current || cursor === null) {
      return;
    }
    isFetchRef.current = true;
    setIsLoading(true);
    try {
      const data = await fetchFn({ ...params, cursorId: cursor });
      setData((prev) => {
        if (!prev) {
          return data;
        }
        return onSuccess(prev, data);
      });
      setCursor(data.cursorId);
      //TODO:콘솔삭제
      console.log(data, cursor);
    } catch (error) {
      setError(error);
    } finally {
      isFetchRef.current = false;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cursor === null) {
      return;
    }

    if (initLoadRef.current) {
      fetchData();
      initLoadRef.current = false;
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData();
        }
      },
      {
        threshold: 0.1,
      }
    );
    obseverRef.current = observer;
    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    return () => {
      if (obseverRef.current) {
        obseverRef.current.disconnect();
      }
    };
  }, [cursor]);

  return {
    data,
    isLoading,
    error,
    lastItemRef,
  };
};

export default useInfiniteScroll;
