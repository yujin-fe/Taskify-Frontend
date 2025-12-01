export interface InfiniteScrollReturn<TData> {
  data: TData | null;
  isLoading: boolean;
  error: unknown;
  lastItemRef: React.RefObject<HTMLLIElement | null>;
  setData: React.Dispatch<React.SetStateAction<TData | null>>;
}
