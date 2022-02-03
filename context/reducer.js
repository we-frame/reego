export const initialState = {
  user: null,
  isLoggedIn: false,
  OTPgen: false,
  products: [],
  error: null,
  errorOTP: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_VIA_PASSWORD':
      return {
        ...state,
        error: null,
        isLoggedIn: true,
      };
    case 'GENERATE_OTP':
      return {
        ...state,
        OTPgen: true,
        errorOTP: null,
      };
    case 'USER_PERSISTENCE':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case 'USER_NULL':
      return {
        ...state,
        user: null,
        error: null,
        isLoggedIn: false,
      };
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
        OTPgen: false,
      };
    case 'ERROR_OTP':
      return {
        ...state,
        errorOTP: action.payload,
        OTPgen: false,
      };
  }
};
