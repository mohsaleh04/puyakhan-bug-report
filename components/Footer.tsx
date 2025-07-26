
import React from 'react';
import { Language } from '../lib/translations';

interface FooterProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  texts: {
    madeWith: string;
    goToSite: string;
  };
  isRTL: boolean;
}

export const Footer: React.FC<FooterProps> = ({ language, setLanguage, texts, isRTL }) => {
  return (
    <div className="flex justify-center items-center w-full">
    <footer className="w-full sm:max-w-5xl bottom-0 z-10 sm:rounded-tl-lg sm:rounded-tr-lg p-4 bg-white/10 backdrop-blur-xl border-t border-white/20 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
      <div className={`max-w-5xl mx-auto flex items-center justify-between font-medium ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Language Selector */}
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className={`appearance-none cursor-pointer py-2 rounded-lg bg-white/30 backdrop-blur-sm border border-white/40 text-white focus:outline-none focus:ring-2 focus:ring-white/50 text-sm ${
              isRTL ? 'pl-10 pr-4 text-right' : 'pl-4 pr-10 text-left'
            }`}
          >
            <option value="FA" className="text-black font-vazir">فارسی</option>
            <option value="EN" className="text-black font-sans">English</option>
          </select>
          <div className={`pointer-events-none absolute inset-y-0 flex items-center px-3 ${isRTL ? 'left-0' : 'right-0'}`}>
             <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-white text-md sm:text-lg text-center mx-2 my-1">
          <a href="https://saltech.ir" target="_blank">
          {texts.madeWith}
          </a>
        </div>

        {/* Go to Site Button */}
        <button
          onClick={() => window.open('https://saltech.ir/apps/PuyaKhan', '_blank')}
          className="px-4 py-2 rounded-lg font-semibold text-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm bg-white shadow-md"
        >
          {texts.goToSite}
        </button>
      </div>
    </footer>
    </div>
  );
};
