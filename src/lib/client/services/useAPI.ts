import useSWR, { SWRConfiguration } from 'swr';
import { AxiosError } from 'axios';
import { handleApiError } from './notificationService';

// Custom hook để gọi API với SWR
const useApi = <T>(key: string, fetcher: () => Promise<T>, customOptions?: SWRConfiguration<T, AxiosError>) => {
  const defaultOptions = {
    revalidateOnFocus: false,
    onError: (error: AxiosError) => handleApiError(error),
  };

  const options = { ...defaultOptions, ...customOptions };

  const { data, error, isLoading } = useSWR<T, AxiosError>(key, fetcher, options);

  return {
    data,
    error,
    isLoading,
  };
};

export default useApi;