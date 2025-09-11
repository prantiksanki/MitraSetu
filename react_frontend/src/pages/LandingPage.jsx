import React from 'react';
import {useNavigate} from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  return (
<div className="min-h-screen bg-white">
  {/* First Section */}
  <div className="relative min-h-screen overflow-hidden bg-gray-50">
    {/* Header */}
    <header className="flex items-center justify-between px-6 py-6">
      <div className="flex items-center">
        <div className="relative w-10 h-10 mr-3">
          {/* Logo from public folder */}
          <img
            src="/colored-logo.png"
            alt="MitraSetu Logo"
            className="object-contain h-10 w-15"
          />
        </div>
        <span
          className="text-2xl font-bold text-transparent bg-gradient-to-tr from-blue-500 via-purple-500 to-orange-400 bg-clip-text"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          MitraSetu
        </span>
      </div>
      <button className="px-6 py-3 text-sm font-bold tracking-wide text-white uppercase rounded-xl bg-gradient-to-tr from-blue-500 via-purple-500 to-orange-400 hover:opacity-90"
      onClick={()=>navigate('/onboarding')}
      >
        GET STARTED
      </button>
    </header>

    {/* Main Content */}
    <div className="flex flex-col items-center px-6 pt-20 pb-32 text-center">
      <h1
        className="mb-16 font-bold leading-none text-transparent text-7xl bg-gradient-to-tr from-blue-500 via-purple-500 to-orange-400 bg-clip-text"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: "-0.02em" }}
      >
      Stronger minds together        
      <br />
        with MitraSetu      
        </h1>

      <button className="px-16 py-5 mb-20 text-lg font-bold tracking-wide text-white uppercase rounded-xl bg-gradient-to-tr from-blue-500 via-purple-500 to-orange-400 hover:opacity-90"
      onClick={()=>navigate('/onboarding')}
      >
        GET STARTED
      </button>

      {/* Bottom section with mascot and elements */}
      <div className="relative w-full max-w-6xl mx-auto -mt-6 h-96 md:-mt-10">
        {/* Large curved background */}
        <div className="absolute bottom-0 left-0 right-0 h-64 rounded-t-full bg-gradient-to-tr from-blue-500 via-purple-500 to-orange-400"></div>

        {/* White curved overlay */}
        <div className="absolute bottom-0 h-32 transform -translate-x-1/2 bg-white rounded-t-full left-1/2 w-80"></div>

        {/* Main Mascot from public folder */}
        <div className="absolute z-20 transform -translate-x-1/2 -bottom-6 md:-bottom-10 left-1/2 sm:left-[52%] md:left-[53%]">
          <img
            src="/mascot.png"
            alt="MitraSetu Mascot"
            className="object-contain w-64 h-64 drop-shadow-xl animate-mascot-wave"
            />

            {/* Treasure chest - left side */}
            <div className="absolute z-10 bottom-32 left-8">
              <div className="relative h-10 transform bg-yellow-600 rounded-md w-14 -rotate-12">
                <div className="w-full h-6 bg-yellow-500 rounded-t-md"></div>
                <div className="absolute w-2 h-2 transform -translate-x-1/2 bg-yellow-700 rounded-full top-1 left-1/2"></div>
              </div>
              {/* Blue gems from chest */}
              <div className="absolute w-3 h-3 transform rotate-45 bg-blue-400 rounded -top-2 left-8"></div>
              <div className="absolute w-2 h-2 transform bg-blue-500 rounded -top-4 left-12 rotate-12"></div>
              <div className="absolute w-2 h-2 transform bg-blue-400 rounded -top-6 left-6 -rotate-12"></div>
            </div>

            {/* Heart - top center left */}
            <div className="absolute z-10 top-16 left-1/4">
              <div className="relative w-8 h-8">
                <div className="absolute top-0 w-3 h-4 origin-bottom transform -rotate-45 bg-red-400 rounded-t-full left-1"></div>
                <div className="absolute top-0 w-3 h-4 origin-bottom transform rotate-45 bg-red-400 rounded-t-full right-1"></div>
                <div className="absolute w-4 h-4 transform rotate-45 -translate-x-1/2 bg-red-400 top-2 left-1/2"></div>
                {/* White highlight */}
                <div className="absolute w-2 h-2 bg-red-300 rounded-full top-1 left-2"></div>
              </div>
            </div>

            {/* Fire/Streak - top right */}
            <div className="absolute z-10 top-20 right-10">
              <div className="relative w-6 h-8">
                <div className="w-6 h-6 bg-orange-400 rounded-full"></div>
                <div className="absolute w-4 h-4 bg-orange-500 rounded-full top-1 left-1"></div>
                <div className="absolute w-2 h-2 bg-yellow-400 rounded-full top-2 left-2"></div>
              </div>
            </div>

            {/* Blue gems - top right */}
            <div className="absolute z-10 top-12 right-8">
              <div className="w-4 h-4 transform rotate-45 bg-blue-400 rounded"></div>
              <div className="absolute w-3 h-3 transform bg-blue-500 rounded top-2 left-6 rotate-12"></div>
            </div>

            {/* Yellow coins scattered around */}
            <div className="absolute w-8 h-3 transform bg-yellow-400 rounded-full shadow-md top-24 left-1/4 rotate-12"></div>
            <div className="absolute w-6 h-2 transform bg-yellow-400 rounded-full shadow-md top-32 left-2/3 -rotate-12"></div>
            <div className="absolute w-8 h-3 transform bg-yellow-400 rounded-full shadow-md top-40 right-1/4 rotate-6"></div>
            <div className="absolute w-10 h-4 transform bg-yellow-400 rounded-full shadow-md bottom-48 left-1/2 -rotate-6"></div>
            <div className="absolute w-6 h-2 transform rotate-45 bg-yellow-400 rounded-full shadow-md bottom-40 right-1/4"></div>

            {/* Green checkmark circle - bottom right */}
            <div className="absolute z-10 bottom-16 right-24 md:right-32">
              <div className="flex items-center justify-center w-12 h-12 bg-teal-500 rounded-full shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Small green square */}
            <div className="absolute w-3 h-3 bg-green-400 rounded shadow-md top-36 right-12"></div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex items-center min-h-screen bg-white">
        {/* Header with language selector */}
        <div className="absolute top-6 right-6">
          <div className="flex items-center text-sm font-medium text-gray-400">
            {/* <span>SITE LANGUAGE: ENGLISH</span> */}
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="w-full px-6 py-16 mx-auto max-w-7xl">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            {/* Left side - Mascot Illustration */}
            <div className="relative flex items-center justify-center">
              <div className="relative">
                {/* Mascot from public folder */}
                <img
                  src="/MitraSetu-Mascot.jpg"
                  alt="MitraSetu Mascot"
                  className="object-contain w-80 h-80 drop-shadow-2xl animate-mascot-wave"
                />
                {/* Floating decorative elements */}
                <div className="absolute w-6 h-2 transform rotate-45 bg-yellow-400 rounded-full shadow-lg top-16 left-8 animate-float-slow"></div>
                <div className="absolute w-8 h-3 transform bg-yellow-400 rounded-full shadow-lg top-32 right-4 -rotate-12 animate-float-mid"></div>
                <div className="absolute w-6 h-2 transform bg-yellow-400 rounded-full shadow-lg bottom-24 left-12 rotate-12 animate-float-fast"></div>
                <div className="absolute w-8 h-3 transform bg-yellow-400 rounded-full shadow-lg bottom-8 right-16 -rotate-6 animate-float-slow"></div>
                <div className="absolute w-4 h-4 transform rotate-45 bg-blue-400 rounded shadow-lg top-20 right-12 animate-float-fast"></div>
                <div className="absolute w-3 h-3 transform bg-blue-500 rounded shadow-lg bottom-32 right-8 rotate-12 animate-float-mid"></div>
              </div>
            </div>

            {/* Right side - Text and buttons */}
            <div className="space-y-8">
              <h2 className="text-6xl font-bold leading-tight text-transparent bg-gradient-to-tr from-blue-500 via-purple-500 to-orange-400 bg-clip-text" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
                The free, fun, and effective way to connect with Mitrasetu!
              </h2>
              
              <div className="max-w-md space-y-4">
                <button className="w-full px-8 py-5 text-lg font-bold tracking-wide text-white uppercase transition-colors bg-gradient-to-tr from-blue-500 via-purple-500 to-orange-400 hover:opacity-90 rounded-xl"
                onClick={()=>navigate('/onboarding')}
                >
                  GET STARTED
                </button>
                <button className="w-full px-8 py-5 text-lg font-bold tracking-wide text-purple-600 uppercase transition-colors bg-white border-2 border-purple-300 hover:bg-purple-50 rounded-xl"
                onClick={()=>navigate('/home')}
                >
                  I ALREADY HAVE AN ACCOUNT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  {/* Local styles for mascot wave animation */}
  <style>{`
    @keyframes mascotWave { 
      0% { transform: translate(-50%, 0) rotate(0deg); }
      25% { transform: translate(-50%, -6px) rotate(2deg); }
      50% { transform: translate(-50%, 0) rotate(0deg); }
      75% { transform: translate(-50%, 6px) rotate(-2deg); }
      100% { transform: translate(-50%, 0) rotate(0deg); }
    }
    .animate-mascot-wave { animation: mascotWave 3.2s ease-in-out infinite; }
  `}</style>
  </div>
  );
};

export default LandingPage;