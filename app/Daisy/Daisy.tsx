"use client";

import { useState, useEffect } from "react";

// Night Sky Stars Component
const StarrySky = () => {
    const [stars, setStars] = useState<{id: number, top: string, left: string, size: number, delay: number, duration: number}[]>([]);

    useEffect(() => {
        // Generate stars randomly on client side to avoid hydration mismatch
        const starArray = Array.from({ length: 120 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 80}%`, 
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2.5 + 0.5,
            delay: Math.random() * 5,
            duration: Math.random() * 4 + 2,
        }));
        setStars(starArray);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute bg-white rounded-full animate-pulse blur-[1px]"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: Math.random() * 0.5 + 0.1,
                        animationDelay: `${star.delay}s`,
                        animationDuration: `${star.duration}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default function SingleNightDaisy() {
  const [bloomed, setBloomed] = useState(false);
  const [showEnvelopeModal, setShowEnvelopeModal] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const numPetals = 16;

  useEffect(() => {
    // Auto bloom smoothly after component mounts
    const timer = setTimeout(() => setBloomed(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCenterClick = () => {
    if (bloomed) {
        setShowEnvelopeModal(true);
        setIsEnvelopeOpen(false); // Make sure it starts closed
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-end w-full min-h-[100dvh] bg-gradient-to-b from-slate-950 via-indigo-950 to-[#090414] overflow-hidden select-none">
      
      {/* Stars Background */}
      <StarrySky />

      {/* Moon */}
      <div className="absolute top-8 right-8 sm:top-12 sm:right-12 md:top-24 md:right-24 w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 bg-amber-50/90 rounded-full blur-[2px] shadow-[0_0_80px_rgba(255,255,255,0.25)] z-0">
        <div className="absolute top-[20%] left-[20%] w-[25%] h-[25%] rounded-full bg-slate-300/40 blur-[1px]" />
        <div className="absolute top-[40%] left-[50%] w-[40%] h-[35%] rounded-full bg-slate-300/30 blur-[2px]" />
        <div className="absolute bottom-[25%] right-[25%] w-[30%] h-[30%] rounded-full bg-slate-300/40 blur-[1.5px]" />
      </div>

      {/* Romantic Greeting Text at Top */}
      <div 
        className="absolute top-[20%] sm:top-[22%] md:top-[28%] w-full flex justify-center z-40 px-4 transition-all duration-[2000ms] ease-out pointer-events-none"
        style={{
          opacity: bloomed ? 1 : 0,
          transform: `translateY(${bloomed ? 0 : '25px'})`,
          transitionDelay: bloomed ? '1500ms' : '0ms'
        }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif text-amber-50 drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] tracking-wide text-center italic">
          Good evening, Love ko, Try tapping po yung center ng daisy po
        </h1>
      </div>

      {/* Single Daisy Wrapper */}
      <div className="absolute z-30 bottom-[12%] sm:bottom-[15%] flex justify-center w-full scale-[0.55] sm:scale-75 md:scale-90 lg:scale-100 transform origin-bottom drop-shadow-2xl pointer-events-none">
        <div className="relative w-80 h-80 flex items-center justify-center pointer-events-auto">
          
          {/* Stem */}
          <div
            className="absolute w-4 bg-gradient-to-b from-green-500 to-green-900 rounded-full origin-top z-0 transition-all duration-1000 ease-out shadow-lg"
            style={{ 
              top: "50%", left: "50%", 
              marginLeft: "-0.5rem", 
              height: bloomed ? "600px" : "0px",
              opacity: bloomed ? 1 : 0
            }}
          />

          {/* Left Leaf */}
          <div
            className="absolute w-24 h-12 bg-gradient-to-br from-green-400 to-green-700 origin-bottom-right z-0 transition-all duration-1000 ease-out shadow-lg"
            style={{ 
              top: "65%", left: "50%", 
              marginLeft: "-6.5rem", 
              borderRadius: "100% 0 100% 0",
              transform: `scale(${bloomed ? 1 : 0}) rotate(${bloomed ? '-15deg' : '-35deg'})`,
              opacity: bloomed ? 1 : 0,
              transitionDelay: bloomed ? '800ms' : '0ms'
            }}
          />
          
          {/* Right Leaf */}
          <div
            className="absolute w-24 h-12 bg-gradient-to-bl from-green-400 to-green-700 origin-bottom-left z-0 transition-all duration-1000 ease-out shadow-lg"
            style={{ 
              top: "75%", left: "50%", 
              marginLeft: "0.5rem", 
              borderRadius: "0 100% 0 100%",
              transform: `scale(${bloomed ? 1 : 0}) rotate(${bloomed ? '15deg' : '35deg'})`,
              opacity: bloomed ? 1 : 0,
              transitionDelay: bloomed ? '1100ms' : '0ms'
            }}
          />

          {/* Center Disk Glow */}
          <div
            className="absolute w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl z-10 transition-all duration-1000 ease-out pointer-events-none"
            style={{
              transform: `scale(${bloomed ? 1.5 : 0})`,
              opacity: bloomed ? 1 : 0,
              transitionDelay: bloomed ? '400ms' : '0ms'
            }}
          />

          {/* Petals */}
          {Array.from({ length: numPetals }).map((_, i) => {
            const angle = (i * 360) / numPetals;
            
            return (
              <div
                key={i}
                className="absolute bg-white rounded-full origin-bottom z-20 shadow-lg border border-pink-50/40 transition-all duration-[1200ms] pointer-events-none"
                style={{
                  width: "2.25rem",
                  height: "10rem",
                  top: "50%",
                  left: "50%",
                  marginLeft: "-1.125rem",
                  marginTop: "-10rem",
                  transform: `rotate(${angle}deg) scaleY(${bloomed ? 1 : 0})`,
                  opacity: bloomed ? 1 : 0,
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transitionDelay: `${bloomed ? 400 + (i * 45) : 0}ms`,
                }}
              >
                <div className="w-full h-full rounded-full border-x border-white/90 bg-gradient-to-b from-white to-pink-50/30 shadow-[inset_0_0_12px_rgba(0,0,0,0.04)]" />
              </div>
            );
          })}

          {/* Center Disk Main - Clickable Button with Kiraw-Kiraw (Flickering) Text */}
          <button
            onClick={handleCenterClick}
            className="absolute w-20 h-20 bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-600 rounded-full shadow-[inset_0_-4px_10px_rgba(0,0,0,0.3),0_0_20px_rgba(252,211,77,0.5)] z-40 flex items-center justify-center overflow-hidden transition-all duration-1000 cursor-pointer group hover:scale-105 active:scale-95"
            style={{
              transform: `scale(${bloomed ? 1 : 0})`,
              transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              transitionDelay: bloomed ? '200ms' : '0ms'
            }}
            aria-label="Open Letter"
          >
            {/* Seeds - slightly faded so text pops more */}
            <div className="flex flex-wrap gap-[2px] p-3 justify-center items-center opacity-70 group-hover:opacity-20 transition-opacity">
              {Array.from({ length: 55 }).map((_, i) => (
                <div key={i} className="w-[4px] h-[4px] rounded-full bg-amber-900/60" />
              ))}
            </div>

            {/* Flickering / Pulsing text (Kiraw-kiraw effect) */}
            <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000"
                style={{
                    opacity: bloomed ? 1 : 0,
                    transitionDelay: bloomed ? '2500ms' : '0ms' // Show up after full bloom
                }}
            >
                <span className="text-white drop-shadow-[0_0_3px_rgba(0,0,0,0.8)] text-xs font-black tracking-widest uppercase animate-pulse">
                    Open
                </span>
            </div>
            
            {/* Soft glowing ring to add to the "kiraw-kiraw" feel */}
            <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping opacity-20" />
          </button>
        </div>
      </div>

      {/* Grass Layers Foreground */}
      <div className="absolute bottom-0 w-full z-10 overflow-hidden flex justify-center h-48 pointer-events-none">
        <div className="absolute -bottom-16 md:-bottom-24 w-[160%] h-48 md:h-64 bg-gradient-to-t from-[#021408] to-[#043315] rounded-[50%] blur-[2px]" />
        <div className="absolute -bottom-20 md:-bottom-32 w-[120%] h-48 md:h-72 bg-gradient-to-t from-[#010c05] to-[#03200b] rounded-[50%] blur-[1px] shadow-[0_-15px_30px_rgba(0,0,0,0.8)]" />
      </div>

      {/* Envelope Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${showEnvelopeModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none delay-200"}`}>
        
        {/* Backdrop */}
        <div 
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-500" 
            onClick={() => { setShowEnvelopeModal(false); setIsEnvelopeOpen(false); }} 
        />

        {/* Envelope Container - Shift down when open so letter stays centered */}
        <div className={`relative w-[90%] max-w-[420px] aspect-[1.5] flex flex-col justify-end items-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            showEnvelopeModal && !isEnvelopeOpen ? "scale-100 translate-y-0" : 
            isEnvelopeOpen ? "scale-100 translate-y-28 sm:translate-y-36" : 
            "scale-75 translate-y-16"
        }`}>

            {/* Top Flap (opens backward) */}
            <div 
                className={`absolute top-0 left-0 right-0 h-[60%] origin-top transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer drop-shadow-xl ${isEnvelopeOpen ? "z-0" : "z-40"}`}
                style={{ 
                    transform: isEnvelopeOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                }}
                onClick={() => { if (!isEnvelopeOpen) setIsEnvelopeOpen(true) }}
            >
                {/* Front Face of Top Flap */}
                <div 
                    className="absolute inset-0 bg-rose-300 z-10"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden' }}
                >
                    {/* Pulsing Heart Sticker to prompt opening */}
                    <div className="absolute bottom-4 left-1/2 -ml-5 w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.6)] hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-white fill-current animate-pulse" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>
                </div>
                
                {/* Back Face of Top Flap */}
                <div 
                    className="absolute inset-0 bg-rose-200 z-0"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', transform: 'rotateX(180deg)', backfaceVisibility: 'hidden' }}
                />
            </div>

            {/* Back Panel of Envelope */}
            <div className="absolute inset-0 bg-rose-300 rounded-b-md shadow-2xl z-10" />
            <div className="absolute inset-0 bg-rose-400 rounded-md shadow-inner z-10 opacity-30" />

            {/* Pull-out Letter Paper */}
            <div 
                className={`absolute left-3 right-3 bottom-0 bg-[#fcfaf5] shadow-xl rounded-sm p-4 sm:p-5 md:p-8 flex flex-col items-center border border-amber-50 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-20 ${
                    isEnvelopeOpen 
                    ? "-translate-y-[65%] sm:-translate-y-[75%] h-[320px] sm:h-[380px] md:h-[420px] opacity-100 visible" 
                    : "translate-y-0 h-[80%] opacity-0 invisible"
                }`}
                style={{ 
                    transitionDelay: isEnvelopeOpen ? '400ms' : '0ms',
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(0,0,0,0.03) 28px)'
                }}
            >
                <div className="w-full flex justify-center mb-3 sm:mb-6">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 fill-current opacity-70" viewBox="0 0 24 24">
                        <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z" />
                    </svg>
                </div>

                <h2 className="text-lg sm:text-2xl font-serif text-slate-800 mb-2 sm:mb-4 font-semibold italic text-center text-rose-950">I'm sorry...</h2>
                <div className="w-full">
                    <p className="text-[12px] sm:text-[14px] md:text-base font-serif text-slate-700 leading-relaxed mb-2 sm:mb-4 text-center">
                        I am writing/creating this because I am genuinely sorry po love to have offended and disappointed you. 
                        I realize po that my actions/words were wrong, and it truly affect me like I dont want to hurt you in every way possible po pero nagawa ko huhuhhuhu.
                    </p>
                    <p className="text-[12px] sm:text-[14px] md:text-base font-serif text-slate-700 leading-relaxed text-center">
                        I'm sorry loveee, I value you and our connection/relationship we have now way too much po, na i dont want na may magbago po sa kung anong meron tayo lovee ko, I'm sorry and hindi na po mauulit love, never po and ahmmm can I have your forgiveness love ko po?.
                    </p>
                </div>
                
                <button 
                    onClick={(e) => { e.stopPropagation(); setShowEnvelopeModal(false); setTimeout(()=>setIsEnvelopeOpen(false), 300) }}
                    className="mt-auto px-6 py-2 sm:px-8 sm:py-2.5 bg-rose-50 text-rose-800 hover:text-white rounded-full hover:bg-rose-400 transition-colors font-medium text-xs sm:text-sm tracking-wide shadow-sm"
                >
                    Close Letter
                </button>
            </div>

            {/* Left, Right & Bottom Flaps overlaid on top of letter */}
            <div className="absolute inset-0 z-30 pointer-events-none rounded-b-md overflow-hidden drop-shadow-md">
                <div className="absolute inset-y-0 left-0 w-1/2 bg-rose-100" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
                <div className="absolute inset-y-0 right-0 w-1/2 bg-rose-200" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
                <div className="absolute inset-x-0 bottom-0 h-[65%] bg-rose-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]" style={{ clipPath: 'polygon(0 100%, 50% 35%, 100% 100%)' }} />
            </div>

        </div>
      </div>

    </div>
  );
}
