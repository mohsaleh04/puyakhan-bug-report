
import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  error?: string;
  isTextArea?: boolean;
  dir?: 'ltr' | 'rtl';
}

export const InputField: React.FC<InputFieldProps> = ({ id, label, type = "text", value, onChange, placeholder, error, isTextArea = false, dir = 'rtl' }) => {
  const baseClasses = `w-full px-4 py-3 bg-white/20 rounded-xl text-white focus:outline-none focus:ring-2 transition-all duration-300 placeholder:font-medium placeholder:text-white/60`;
  const errorClasses = error ? 'border-2 border-red-400/80 focus:ring-red-400' : 'border-2 border-transparent focus:ring-purple-400';
  const alignmentClass = dir === 'rtl' ? 'text-right' : 'text-left';

  const className = `${baseClasses} ${errorClasses} ${alignmentClass}`;

  const commonProps = {
    id: id,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    dir: dir,
  };
  
  return (
    <div className="bg-white/10 rounded-2xl p-4 border border-white/20 shadow-inner backdrop-blur-sm">
      <label htmlFor={id} className="block mb-4 text-center text-lg font-bold text-white/95 tracking-wider">
        {label}
      </label>
      <div className="relative">
      {isTextArea ? (
        <textarea {...commonProps} rows={4} className={`${className} resize-none`}></textarea>
      ) : (
        <input {...commonProps} type={type} className={className} />
      )}
      </div>
      {error && <p className="mt-3 text-sm text-center text-white bg-red-500/90 backdrop-blur-sm rounded-lg py-1.5 px-3 font-semibold">{error}</p>}
    </div>
  );
};
