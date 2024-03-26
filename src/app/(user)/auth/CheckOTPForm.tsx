import React, { MouseEventHandler, FormEventHandler } from 'react';
import OTPInput from 'react-otp-input';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { CiEdit } from 'react-icons/ci';
import Loading from '@/src/common/Loading';

type AuthResponse = {
  message: string;
  user: {
    isActive: boolean;
  };
};

type OnResendOtpHandler =
  | React.FormEventHandler<HTMLFormElement>
  | React.MouseEventHandler<HTMLButtonElement>;

type Props = {
  onBack: () => void;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  onResendOtp?: OnResendOtpHandler;
  time: number;
  otpResponse: AuthResponse | undefined;
  isCheckingOtp: boolean;
};

export default function CheckOTPForm({
  otpResponse,
  onSubmit,
  otp,
  setOtp,
  onBack,
  time,
  onResendOtp,
  isCheckingOtp,
}: Props) {
  return (
    <div>
      <button onClick={onBack} className="mb-4" >
        <HiArrowNarrowRight className="w-6 h-6 text-secondary-500" />
      </button>
      {otpResponse && (
        <p>
          {otpResponse?.message}
          <button onClick={onBack}>
            <CiEdit className="w-6 h-6 text-primary-900" />
          </button>
        </p>
      )}
      <div className="mb-4 text-secondary-500">
        {time > 0 ? (
          <p>{time} ثانیه تا ارسال مجدد کد</p>
        ) : (
          <button
            onClick={onResendOtp as React.MouseEventHandler<HTMLButtonElement>}
          >
            ارسال مجدد کد؟
          </button>
        )}
      </div>

      <form className="space-y-10" onSubmit={onSubmit}>
        <p className="font-bold">کد تایید را وارد کنید</p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          inputStyle={{
            width: '2.5rem',
            padding: '0.5rem 0.2rem',
            border: '1px solid rgb(var(--color-primary-300))',
            borderRadius: '0.5rem',
          }}
          containerStyle="flex flex-row-reverse gap-x-2 justify-center"
          renderInput={(props) => <input {...props} />}
        />
        <div>
          {isCheckingOtp ? (
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
