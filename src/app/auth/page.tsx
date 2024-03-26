'use client';

import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { checkOtp, getOtp } from '@/src/services/authServices';
import CheckOTPForm from './CheckOTPForm';
import { useRouter } from 'next/navigation';
import SendOTPForm from './SendOTPForm';
import toast from 'react-hot-toast';
import axios, { AxiosError } from 'axios';

const RESEND_TIME: number = 90;

type AuthResponse = {
  message: string;
  user: {
    isActive: boolean;
  };
};

type Props = {};

const AuthPage: React.FC<Props> = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [time, setTime] = useState(RESEND_TIME);
  const router = useRouter();

  const {
    data: otpResponse,
    isPending,
    mutateAsync: mutateGetOtp,
  } = useMutation<AuthResponse, AxiosError, { phoneNumber: string }>({
    mutationFn: getOtp,
  });

  const { mutateAsync: mutateCheckOtp, isPending: isCheckingOtp } = useMutation<
    AuthResponse,
    AxiosError,
    { phoneNumber: string; otp: string }
  >({
    mutationFn: checkOtp,
  });

  const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(e.target.value);
  };

  const sendOtpHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const data: AuthResponse = await mutateGetOtp({ phoneNumber });
      toast.success(data.message);
      setStep(2);
      setTime(RESEND_TIME);
      setOtp('');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const checkOtpHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const { message, user }: AuthResponse = await mutateCheckOtp({
        phoneNumber,
        otp,
      });
      toast.success(message);
      router.push(user.isActive ? '/' : '/complete-profile');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    const timer: false | NodeJS.Timeout =
      time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(timer as NodeJS.Timeout);
  }, [time]);

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            phoneNumber={phoneNumber}
            onChange={phoneNumberHandler}
            onSubmit={sendOtpHandler}
            isLoading={isPending}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            onBack={() => setStep((s) => s - 1)}
            otp={otp}
            setOtp={setOtp}
            onSubmit={checkOtpHandler}
            time={time}
            onResendOtp={sendOtpHandler}
            otpResponse={otpResponse}
            isCheckingOtp={isCheckingOtp}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">{renderSteps()}</div>
    </div>
  );
};
export default AuthPage;
