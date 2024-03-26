import { Toaster } from 'react-hot-toast';
import Providers from '../../Providers';
import vazirFont from '@/src/constants/localFonts';
import SideBar from './SideBar';
import '../../globals.css';

export const metadata = {
  title: 'پروفایل کاربر',
  description: 'پروفایل کاربر',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body
        suppressHydrationWarning={true}
        className={`${vazirFont.variable} font-sans`}
      >
        <Providers>
          <Toaster />
          <div className="grid grid-cols-5 bg-white h-screen">
            <div className="col-span-1 bg-gray-100 overflow-y-auto p-4">
              <SideBar />
            </div>
            <div className="col-span-4 overflow-y-auto p-4">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
