
export type Language = 'FA' | 'EN';

export const translations = {
  FA: {
    title: 'گزارش خطا رمز موقت',
    emailLabel: 'آدرس ایمیل',
    emailPlaceholder: 'example@email.com',
    smsLabel: 'پیامک دریافت شده',
    smsPlaceholder: 'محتوای کامل پیامکی که دریافت کرده‌اید را وارد کنید',
    otpLabel: 'کد OTP صحیح',
    submitButton: 'ثبت گزارش',
    submitting: 'در حال ارسال...',
    successMessage: 'گزارش شما با موفقیت ثبت شد. متشکریم!',
    errorMessage: 'خطا در ارسال گزارش. لطفا دوباره تلاش کنید.',
    footer: {
      madeWith: 'تهیه شده با ❤️ توسط صالتک',
      goToSite: 'پویاخوان'
    },
    errors: {
      emailRequired: "ایمیل الزامی است.",
      emailInvalid: "فرمت ایمیل نامعتبر است.",
      smsRequired: "محتوای پیامک الزامی است.",
      otpRequired: "کد صحیح الزامی است.",
      otpInvalid: "کد باید بین ۴ تا ۸ رقم باشد.",
    }
  },
  EN: {
    title: 'OTP Bug Report',
    emailLabel: 'Email Address',
    emailPlaceholder: 'example@email.com',
    smsLabel: 'Received SMS',
    smsPlaceholder: 'Enter the full content of the SMS you received',
    otpLabel: 'Correct OTP Code',
    submitButton: 'Submit Report',
    submitting: 'Submitting...',
    successMessage: 'Your report has been submitted successfully. Thank you!',
    errorMessage: 'Error submitting report. Please try again.',
    footer: {
      madeWith: 'Made with ❤️☕ by SalTech',
      goToSite: 'PuyaKhan'
    },
    errors: {
      emailRequired: "Email is required.",
      emailInvalid: "Email format is invalid.",
      smsRequired: "SMS content is required.",
      otpRequired: "Correct OTP is required.",
      otpInvalid: "OTP must be between 4 and 8 digits.",
    }
  }
};
