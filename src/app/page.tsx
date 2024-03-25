import Image from 'next/image';
import React from 'react';

type AdInterface = {
  image?: HTMLImageElement | undefined;
};

const Home: React.FC<AdInterface> = () => {
  return (
    <main className="container xl:max-w-screen-xl">
      <div className='flex flex-row-reverse justify-between items-center'>
        <div>
          <Image
            src="/images/Ads 1.svg"
            alt="image doesn't show"
            width={630}
            height={360}
          />
        </div>
        <div>
          <Image
            src="/images/Ads 2.svg"
            alt="image doesn't show"
            width={630}
            height={360}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
