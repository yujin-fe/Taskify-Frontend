import { useState } from 'react';
import { validators } from '@/utils/validation';

interface ShowPasswordType {
  password: boolean;
  confirmPassword: boolean;
}

const useAuthForm = <InitT extends Record<string, string>>(initialValue: InitT) => {
  const [authForm, setAuthForm] = useState(initialValue);
  const [error, setError] = useState(initialValue);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const disabled = Object.entries(authForm).some(([key, value]) => {
    if (value === '') {
      return true;
    }
    if (key in validators) {
      return validators[key](value) !== '';
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

  const handleBlur = (key: string) => (value: string) => {
    const message = key in validators ? validators[key](value) : '';
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
