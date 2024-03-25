'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  MutationFunction,
  UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import { checkOtp, getOtp } from '@/src/services/authServices';
import CheckOTPForm from './CheckOTPForm';
import { useRouter } from 'next/navigation';
import SendOTPForm from './SendOTPForm';

const RESEND_TIME = 90;

type AuthResponse = {
  message: string;
  user: {
    isActive: boolean;
  };
};

type Props = {};

const AuthPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [time, setTime] = useState(RESEND_TIME);
  const router = useRouter();

  const {
    data: otpResponse,
    isLoading: isLoadingGetOtp,
    mutateAsync: mutateGetOtp,
  } = useMutation<AuthResponse, unknown, { phoneNumber: string }>({
    mutationFn: getOtp,
  });

  const { mutateAsync: mutateCheckOtp, isLoading: isCheckingOtp } = useMutation(
    {
      mutationFn: checkOtp,
    }
  );

  const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(e.target.value);
  };

  const sendOtpHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      const data = await mutateGetOtp({ phoneNumber });
      toast.success(data.message);
      setStep(2);
      setTime(RESEND_TIME);
      setOtp('');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  //   const resendOtpClickHandler: React.MouseEventHandler<
  //     HTMLButtonElement
  //   > = async (e) => {
  //     e.preventDefault();
  //     await sendOtpHandler();
  //   };

  const checkOtpHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const { message, user } = await mutateCheckOtp({ phoneNumber, otp });
      toast.success(message);
      router.push(user.isActive ? '/' : '/complete-profile');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            phoneNumber={phoneNumber}
            onChange={phoneNumberHandler}
            onSubmit={sendOtpHandler}
            isLoading={isLoadingGetOtp}
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
