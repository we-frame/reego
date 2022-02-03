import { API_URL, NEXT_URL } from 'config';
import { useRouter } from 'next/dist/client/router';
import React, { createContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './reducer';

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => checkUserLoggedIn(), []);

  // LOGIN!
  const login = async (loginData) => {
    try {
      const res = await fetch(`${NEXT_URL}/api/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch({ type: 'ERROR', payload: data.message });
      } else {
        dispatch({ type: 'LOGIN_VIA_PASSWORD', payload: data });
        router.push('/account/dashboard');
      }
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  };

  // GENERATE OTP!
  const generateOTP = async (loginData) => {
    try {
      const res = await fetch(`${NEXT_URL}/api/generateOTP`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch({ type: 'ERROR_OTP', payload: data.message });
      } else {
        dispatch({ type: 'GENERATE_OTP', payload: data });
      }
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err });
    }
  };

  //  USER PERSISTENCE!
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: 'USER_PERSISTENCE', payload: data });
    } else {
      dispatch({ type: 'USER_NULL' });
    }
  };

  //LOGOUT!
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    });
    if (res.ok) {
      dispatch({ type: 'USER_NULL' });
      router.push('/');
    }
  };

  return (
    <StateContext.Provider value={{ ...state, login, generateOTP, logout }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
