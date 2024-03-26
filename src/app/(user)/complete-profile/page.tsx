'use client';

import React from 'react';
import TextField from '@/src/common/TextField';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { completeProfile } from '@/src/services/authServices';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type AuthResponse = {
  message: string;
};

const CompleteProfile: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const { isPending, mutateAsync } = useMutation<
    AuthResponse,
    AxiosError,
    { name: string; email: string }
  >({
    mutationFn: completeProfile,
  });
  const router = useRouter();

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const { message }: AuthResponse = await mutateAsync({ name, email });
      toast.success(message);
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">
        <form className="space-y-8" onSubmit={submitHandler}>
          <TextField
            name="name"
            label="نام و نام خانوادگی"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            name="email"
            label="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            {isPending ? (
              <p>Loading...</p>
            ) : (
              <button type="submit" className="btn btn--primary w-full">
                تایید
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
