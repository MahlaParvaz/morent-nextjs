'use client';

import Link from 'next/link';
import { useGetUser } from '@/src/hooks/useAuth';

interface User {
  name: string;
}

interface Cart {
  payDetail: {
    productIds: string[];
  };
}

function Header() {
  const { data, error, isPending } = useGetUser();
  const { user, cart }: { user?: User; cart?: Cart } = data || {};

  return (
    <header
      className={`shadow-sm mb-10 sticky top-0 transition-all duration-200 bg-white ${
        isPending ? 'blur-sm opacity-70' : 'opacity-100 blur-0'
      }`}
    >
      <nav className="flex container xl:max-w-screen-xl">
        <div className="flex-1">
          <ul className="flex items-center justify-between py-2 ">
            {user ? (
              <span>{user.name}</span>
            ) : (
              <li>
                <Link
                  className="block py-2 bg-primary-900 text-white rounded-md px-6"
                  href="/auth"
                >
                  ورود | ثبت نام
                </Link>
              </li>
            )}

            <li>
              <Link className="block py-2" href="/">
                خانه
              </Link>
            </li>

            <li>
              <Link className="block py-2" href="/products">
                محصولات
              </Link>
            </li>
            <li>
              <Link className="block py-2" href="/profile">
                پنل کاربر
              </Link>
            </li>
            <li>
              <Link className="block py-2" href="/admin">
                پنل ادمین
              </Link>
            </li>
            <li>
              <Link className="block py-2" href="/cart">
                سبد خرید ({cart ? cart.payDetail.productIds.length : 0})
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex pr-6 justify-center items-center">
          <span className="text-[24px] font-bold text-primary-900">MORENT</span>
        </div>
      </nav>
    </header>
  );
}
export default Header;
