import { getUserProfile } from '@/src/services/authServices';
import { useQuery } from '@tanstack/react-query';

export const useGetUser = () =>
  useQuery({
    queryKey: ['get-user'],
    queryFn: getUserProfile,
    retry: false,
    refetchOnWindowFocus: true,
  });
