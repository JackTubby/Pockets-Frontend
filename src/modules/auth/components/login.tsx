import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useAppContext } from '../../core/utils/app-provider';
import authService from '../services/auth.service';

interface LoginResponse {
  token: string;
  user: {
    authorisedAccounts: {
      id: string;
    }[];
  };
}

const Login: React.FC = () => {
  const { setToken, setAccountId } = useAppContext();
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const {
    data,
    error,
    isFetched,
    isSuccess,
  } = useQuery<AxiosResponse<LoginResponse>, AxiosError>({
    queryKey: ['login', username, password],
    queryFn: () => authService.login({ username, password }),
    enabled,
    retry: 0,
    gcTime: 0,
  });

  useEffect(() => {
    if (isSuccess && isFetched && data) {
      const {
        token,
        user: { authorisedAccounts },
      } = data.data;
      setToken(token);
      setAccountId(authorisedAccounts[0].id);
      setUsername('');
      setPassword('');
      navigate('/');
    } else if (error?.response?.status === 401) {
      setErrMsg('The username or password is incorrect');
    } else if (error) {
      setErrMsg('Login Failed - an error occurred');
    }
  }, [isSuccess, isFetched, data, error]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnabled(true);
  };

  const getErrorMessage = () => {
    if (errMsg) {
      return (
        <div className="mb-8 text-center text-red-500" ref={errRef}>
          {errMsg}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {getErrorMessage()}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <InputText
              type="text"
              id="username"
              className="w-full"
              ref={usernameRef}
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              required
              aria-invalid={!!errMsg}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <Password
              onChange={handlePasswordInput}
              value={password}
              feedback={false}
              inputClassName="w-full"
              className="w-full"
              aria-invalid={!!errMsg}
            />
          </div>

          <div>
            <Button label="Submit" className="w-full" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
