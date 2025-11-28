import { useState } from 'react';
import { validators } from '@/utils/validation';

interface ShowPasswordType {
  password: boolean;
  confirmPassword: boolean;
  newPassword: boolean;
}

const useAuthForm = <InitT extends Record<string, string>>(
  initialValue: InitT,
  confirmCompareKey: string = 'password'
) => {
  const [authForm, setAuthForm] = useState(initialValue);
  const [error, setError] = useState(initialValue);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
    newPassword: false,
  });

  const disabled = Object.entries(authForm).some(([key, value]) => {
    if (value === '') {
      return true;
    }
    if (key in validators) {
      return validators[key](value) !== '';
    }
    if (key === 'confirmPassword') {
      return value !== authForm[confirmCompareKey];
    }

    return false;
  });

  const handleShowPasswordToggle = (key: keyof ShowPasswordType) => {
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange =
    <T extends keyof InitT>(key: T) =>
    (value: string) => {
      setAuthForm((prev) => ({ ...prev, [key]: value }));
      setError((prev) => ({ ...prev, [key]: '' }));
    };

  const handleBlur = (key: string, compareValue?: string) => (value: string) => {
    let message = '';

    if (key === 'confirmPassword') {
      message = value === compareValue ? '' : '비밀번호가 일치하지 않습니다.';
    } else if (key in validators) {
      message = validators[key](value);
    }

    setError((prev) => ({ ...prev, [key]: message }));
  };

  return {
    error,
    authForm,
    setAuthForm,
    disabled,
    showPassword,
    handleShowPasswordToggle,
    handleChange,
    handleBlur,
  };
};

export default useAuthForm;
