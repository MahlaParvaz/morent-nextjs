import vazirFont from '@/src/constants/localFonts';
import '../../globals.css';
import Providers from '@/src/app/Providers';
import { Toaster } from 'react-hot-toast';
// import AdminSideBar from './AdminSideBar';

export const metadata = {
  title: 'پروفایل ادمین',
  description: 'پروفایل ادمین',
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
        className={`${vazirFont.variable} font-sans bg-background`}
      >
        <Providers>
          <Toaster />
          <div className="container xl:max-w-screen-xl">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
