export const initialState = {
  user: null,
  isLoggedIn: false,
  OTPgen: false,
  loading: false,
  error: null,
  reg_error: null,
  errorOTP: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_VIA_PASSWORD':
      return {
        ...state,
        error: null,
        errorOTP: null,
        isLoggedIn: true,
        loading: false,
      };
    case 'GENERATE_OTP':
      return {
        ...state,
        OTPgen: true,
        errorOTP: null,
        loading: false,
      };
    case 'USER_PERSISTENCE':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        loading: false,
      };
    case 'USER_NULL':
      return {
        ...state,
        user: null,
        error: null,
        isLoggedIn: false,
        loading: false,
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
        OTPgen: false,
        loading: false,
      };
    case 'REG_ERROR':
      return {
        ...state,
        reg_error: action.payload,
        OTPgen: false,
        loading: false,
      };
    case 'ERROR_OTP':
      return {
        ...state,
        errorOTP: action.payload,
        OTPgen: false,
        loading: false,
      };
    case 'BACK_TO_NUMBER':
      return {
        ...state,
        OTPgen: false,
      };
  }
};
