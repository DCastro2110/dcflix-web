import { useContext } from 'react';
import { useQuery } from 'react-query';

import { AuthContext } from '@/contexts/AuthContext';

import { me } from '@/services/dcflixApi/me';

export function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  const query = useQuery({
    queryFn: me,
    onSuccess: (data) => {
      setUser(data.data.user);
    },
    enabled: !user.id,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
