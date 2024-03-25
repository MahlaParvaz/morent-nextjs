import Loading from '@/src/common/Loading';
import TextField from '@/src/common/TextField';
import React from 'react';

type Props = {
  phoneNumber: string;
  // value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
};

export default function SendOTPForm({
  phoneNumber,
  onChange,
  onSubmit,
  isLoading,
  
}: Props) {
  return (
    <div>
      <form className="space-y-10" onSubmit={onSubmit}>
        <TextField
          label="Phone Number "
          name="phoneNumber"
          value={phoneNumber}
          onChange={onChange}
        />
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              Send code
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
