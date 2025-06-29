import React from 'react';
import Card from '../components/Card';
import ReviewComp from '../components/ReviewComp';
import Footer from '../components/Footer'
import GetStartedButton from '../components/GetStartedButton';

const Home = () => {
  return (
    <div className='flex flex-col items-center min-h-full font-sans mt-[2rem]'>
      {/* Header Section with Background Layer Effect */}
      <div className="relative flex flex-col rounded-3xl justify-center text-white items-center w-[22rem] h-[45rem] bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8vfPCD4g8CBOteCvNY4zzChu4FqNGrG5myqicwv36cRm1OUq0Zp85qIyFGVOZYP_khm0SA-Oq7A-B5uf2hmGE20gxYMGuZ8eLC3N9STFavRexGOy0yA704K1S0ZsrU5fhtyE0qTfXOq4cEaaK227a6ZoMIG1u0iAep05XPGRK6_q50UeqdvoLJeb3dFrqAU00psF_3sRsUQZyKEXEkip2lSsrzTFkQwWBaePsJDOBMX__8oPxiwzinlj-Pzuknn171IYtEaT0IA4')] bg-cover bg-center border-0 sm:w-[70rem] sm:h-[30rem]">
        {/* Layer Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-black/10 to-black/40 z-0">
        {/* <GetStartedButton/> */}
        
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center sm:items-start sm:flex-row">
          <h1 className="text-[2.5rem] sm:text-[4rem] lg:text-[5rem] font-extrabold tracking-tighter">
            Your Privacy,
          </h1>
          <h1 className="text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] font-extrabold tracking-tighter">
            Simplified
          </h1>
        </div>
        <p className="block sm:hidden relative z-10 text-lg leading-relaxed text-center mt-4">
          Effortlessly protect your data with tools <br />
          that help you manage passwords, <br />
          detect breaches, generate fake info, <br />
          and stay ahead with cybersecurity news.
        </p>
        <p className="hidden sm:block relative z-10 text-xl leading-loose text-center mt-4">
          Effortlessly protect your data with tools that help you manage passwords, detect breaches, generate fake info, and stay ahead with cybersecurity news.
        </p>
      </div>

      {/* Explore Our Tools Section */}
      <h1 className='text-[2.5rem] mt-[2rem] font-extrabold text-center sm:text-[3.5rem] tracking-wide'>
        Explore Our Tools
      </h1>
      <div className='flex flex-col gap-6 items-center mt-6 sm:flex-row'>
        <Card />
      </div>

      {/* Reviews Section */}
      <h1 className='text-[2.2rem] mt-[2rem] font-extrabold text-center sm:text-[3.5rem] tracking-wide'>
        What Our Users Say.
      </h1>
      <div className='flex flex-col gap-6 items-center mt-6'>
        <ReviewComp />
      </div>

      {/* Footer */}
     <Footer/>
    </div>
  );
};

export default Home;
