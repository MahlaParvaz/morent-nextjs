import LocalFont from 'next/font/local';
const vazirFont = LocalFont({
  src: [
    {
      path: '../../public/fonts/vazir/Vazirmatn-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vazir/Vazirmatn-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vazir/Vazirmatn-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vazir/Vazirmatn-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vazir/Vazirmatn-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-vazir',
  style: 'normal',
  display: 'block',
});

export default vazirFont;
// const jakarta = LocalFont({
//   src: [
//     {
//       path: '../../public/fonts/jakarta/PlusJakartaSans-Regular.ttf',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../../public/fonts/jakarta/PlusJakartaSans-Medium.ttf',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: '../../public/fonts/jakarta/PlusJakartaSans-Bold.ttf',
//       weight: '700',
//       style: 'normal',
//     },
//     {
//       path: '../../public/fonts/jakarta/PlusJakartaSans-ExtraBold.ttf',
//       weight: '800',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-jakarta',
//   style: 'normal',
//   display: 'block',
// });
// export default jakarta;
