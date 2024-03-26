'use client';

import Loading from '@/src/common/Loading';
import TextField from '@/src/common/TextField';
import { useGetUser } from '@/src/hooks/useAuth';
import { updateProfile } from '@/src/services/authServices';
import { includeObj } from '@/src/utils/objectUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

type User = {
  name: string;
  email: string;
  phoneNumber: string;
  biography: string;
};

type AuthResponse = {
  message: string;
  user: {
    isActive: boolean;
  };
};

export default function MePage() {
  const { data, isLoading } = useGetUser();
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutateAsync } = useMutation<
    AuthResponse,
    AxiosError,
    Partial<User>
  >({
    mutationFn: updateProfile,
  });
  const [formData, setFormData] = useState<Partial<User>>({});
  const { user }: { user?: Partial<User> } = data || {};

  const includeskey: (keyof User)[] = [
    'name',
    'email',
    'phoneNumber',
    'biography',
  ];

  useEffect(() => {
    if (user) setFormData(includeObj(user, includeskey));
  }, [user]);

  const sumbitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync(formData);
      queryClient.invalidateQueries({ queryKey: ['get-user'] });
      toast.success(message);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-sm">
      <h1 className="text-xl font-bold mb-4">اطلاعات کاربری</h1>
      <form onSubmit={sumbitHandler} className="space-y-5 mr-5">
        {includeskey.map((key) => {
          return (
            <TextField
              label={key}
              name={key}
              key={key}
              value={(formData[key] as string) || ''}
              onChange={handleChange}
            />
          );
        })}
        <div className="pt-2">
          {isUpdating ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
