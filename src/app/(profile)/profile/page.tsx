'use client';

import React from 'react';
import Loading from '@/src/common/Loading';
import { useGetUser } from '@/src/hooks/useAuth';
import { toLocalDateString } from '@/src/utils/toLocalDate';
import Link from 'next/link';

type Props = {};

export default function Profile({}: Props) {
  const { data, isPending } = useGetUser();
  const { user, payments } = data || {};
  if (isPending) return <Loading />;
  return (
    <div className="py-4">
      <h1 className="mb-4 text-xl">
        سلام ! <span className="font-bold">{user.name}</span> خوش آمدی!
      </h1>
      <p>
        <span>تاریخ پیوستن:</span>
        <span> {toLocalDateString(user.createdAt)} </span>
      </p>
      <div className="border rounded-xl  mt-8">
        <div className="p-4 flex items-center justify-between">
          <h2 className="font-bold text-xl">آخرین سفارشات کاربر</h2>
          <Link className="text-primary-900 font-bold" href="/profile/payments">
            مشاهده همه سفارشات
          </Link>
        </div>
      </div>
    </div>
  );
}
