
import React from 'react';

interface OtpInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  maxLength?: number;
}

export const OtpInput: React.FC<OtpInputProps> = ({ id, label, value, onChange, placeholder, error, maxLength = 8 }) => {
  return (
    // Container to match the nested, translucent box style from the image
    <div className="bg-white/10 rounded-2xl p-4 border border-white/20 shadow-inner backdrop-blur-sm">
      <label htmlFor={id} className="block mb-4 text-center text-lg font-bold text-white/95 tracking-wider">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type="tel"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          // Key styles: letter-spacing, text alignment, font size, etc.
          className={`w-full px-2 py-3 bg-white/20 rounded-xl text-center font-bold text-xl text-white tracking-[0.4em] focus:outline-none focus:ring-2 transition-all duration-300 placeholder:tracking-normal placeholder:font-medium placeholder:text-2xl placeholder:text-white/60 ${
            error
              ? 'border-2 border-red-400/80 focus:ring-red-400'
              : 'border-2 border-transparent focus:ring-purple-400'
          }`}
          onFocus={(e) => e.target.select()}
        />
      </div>
      {error && <p className="mt-3 text-sm text-center text-white bg-red-500/90 backdrop-blur-sm rounded-lg py-1.5 px-3 font-semibold">{error}</p>}
    </div>
  );
};
