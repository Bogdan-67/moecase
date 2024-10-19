'use client';

import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import AuthService from '../../services/AuthService';
import { AuthResponse } from '../../models/response/AuthResponse';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IUser } from '../../models/IUser';
import { API_URL } from '../../http';
import { ErrorResponse } from '@/models/response/ErrorResponse';
import { HYDRATE } from 'next-redux-wrapper';

export type LoginParams = {
  login: string;
  password: string;
};

export type RegistrParams = LoginParams & {
  email: string;
  username: string;
  recaptcha: string; // Добавлено поле для капчи
};

export type FetchUserParams = {
  id_account: number;
};

const localAuth = (local: string) => {
  if (local === 'true') return true;
  else return false;
};

const checkAuthInLocalStorage = (key: string) => {
  if (!key || typeof window === 'undefined') {
    return false;
  }
  return localAuth(localStorage.getItem(key) as string);
};

// Функция логина
export const loginAccount = createAsyncThunk<
  AxiosResponse<AuthResponse>,
  LoginParams,
  { rejectValue: string }
>('user/loginStatus', async (params, { rejectWithValue }) => {
  console.log('FUNCTION LOGIN');
  try {
    const { login, password } = params;
    const response = await AuthService.login(login, password);
    console.log('login', response);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (!error.response) {
        return rejectWithValue('Unknown error');
      } else return rejectWithValue(error.response.data.message);
    } else return rejectWithValue('Unknown error');
  }
});

// Функция регистрации
export const registrAccount = createAsyncThunk<AxiosResponse<AuthResponse>, RegistrParams>(
  'user/registrStatus',
  async (params, { rejectWithValue }) => {
    try {
      const { email, login, username, password, recaptcha } = params;
      const response = await AuthService.registration(login, username, password, email, recaptcha);
      console.log('registration', response);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          return rejectWithValue('Unknown error');
        } else return rejectWithValue(error.response.data.message);
      } else return rejectWithValue('Unknown error');
    }
  },
);

// Функция логаута
export const logoutAccount = createAsyncThunk<void, void>('user/logoutStatus', async () => {
  try {
    await AuthService.logout();
  } catch (error) {
    console.log(error);
  }
});

// Функция проверки авторизации
export const checkAuth = createAsyncThunk<AxiosResponse<AuthResponse>, void>(
  'user/checkAuthStatus',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}refresh`, {
        withCredentials: true,
      });
      console.log('RESPONSE', response);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          return rejectWithValue('Unknown error');
        } else return rejectWithValue(error.response.data.message);
      } else return rejectWithValue('Unknown error');
    }
  },
);

// Функция запроса данных о пользователе
// export const fetchUser = createAsyncThunk<AxiosResponse<IUser>, FetchUserParams>(
//   'user/fetchUserStatus',
//   async (params, { rejectWithValue }) => {
//     try {
//       const { id_account } = params;
//       const response = await UserService.fetchUser(id_account);
//       return response;
//     } catch (error) {
//         if (error instanceof AxiosError) {
//             if (!error.response) {
//               return rejectWithValue('Unknown error');
//             } else return rejectWithValue(error.response.data.message);
//           } else return rejectWithValue('Unknown error');
//     }
//   },
// );

// Функция обновления данных пользователя
// export const updateUser = createAsyncThunk<
//   AxiosResponse<IUser>,
//   { id_user: number; userData: Partial<IUser> }
// >('user/updateUserData', async (params, { rejectWithValue }) => {
//   try {
//     const { id_user, userData } = params;
//     const response = await UserService.updateUser(id_user, userData);
//     console.log('response', response);
//     return response;
//   } catch (error) {
//     if (!error.response) {
//       throw error;
//     }
//     alert(error.response?.data?.message);
//     return rejectWithValue(error.response?.data?.message);
//   }
// });

// Ключи статуса
export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface Account {
  user: IUser;
  status: Status;
  isAuth: boolean;
  updateUserStatus: Status;
}

const initialState: Account = {
  user: {
    id_account: null,
    username: '',
    email: '',
    balance: 0,
    role: '',
    login: '',
    img: '',
  },
  status: Status.SUCCESS,
  isAuth: checkAuthInLocalStorage('isAuth') ? checkAuthInLocalStorage('isAuth') : false,
  updateUserStatus: Status.SUCCESS, // Изначально статус обновления данных пользователя установлен в SUCCESS
};
const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setError(state) {
      state.status = Status.ERROR;
    },
    setUpdateUserStatus(state) {
      state.updateUserStatus = Status.ERROR;
    },
    setImg(state, action: PayloadAction<string>) {
      state.user.img = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload,
      };
    }),
      // Кейсы для логина
      builder.addCase(loginAccount.pending, (state) => {
        console.log('LOADING');
        state.status = Status.LOADING;
        state.user = initialState.user;
      });
    builder.addCase(loginAccount.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      console.log('USer', state.user);
      state.status = Status.SUCCESS;
      localStorage.setItem('token', action.payload.data.accessToken);
      localStorage.setItem('role', action.payload.data.user.role);
      state.isAuth = true;
      localStorage.isAuth = true;
    });
    builder.addCase(loginAccount.rejected, (state, action) => {
      console.log('REJECTED');
      alert(action.payload);
      state.status = Status.ERROR;
      state.user = initialState.user;
    });

    // Кейсы для регистрации
    builder.addCase(registrAccount.pending, (state) => {
      state.status = Status.LOADING;
      state.user = initialState.user;
    });
    builder.addCase(registrAccount.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      state.status = Status.SUCCESS;
      localStorage.setItem('token', action.payload.data.accessToken);
      localStorage.setItem('role', action.payload.data.user.role);
      state.isAuth = true;
      localStorage.isAuth = true;
    });
    builder.addCase(registrAccount.rejected, (state, action) => {
      console.log('REJECTED');
      alert(action.payload);
      state.status = Status.ERROR;
      state.user = initialState.user;
    });

    // Кейсы для логаута
    builder.addCase(logoutAccount.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(logoutAccount.fulfilled, (state) => {
      state.status = Status.SUCCESS;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      state.isAuth = false;
      localStorage.isAuth = false;
      state.user = initialState.user;
    });
    builder.addCase(logoutAccount.rejected, (state) => {
      state.status = Status.ERROR;
    });

    // Кейсы для обновления данных пользователя
    // builder.addCase(updateUser.pending, (state) => {
    //   state.updateUserStatus = Status.LOADING;
    // });

    // builder.addCase(updateUser.fulfilled, (state, action) => {
    //   state.updateUserStatus = Status.SUCCESS;
    //   state.user = action.payload.data;
    //   localStorage.setItem('role', action.payload.data.role);
    // });

    // builder.addCase(updateUser.rejected, (state) => {
    //   state.updateUserStatus = Status.ERROR; // Устанавливаем статус ERROR при ошибке при обновлении данных пользователя
    // });

    // Кейсы для проверки авторизации
    builder.addCase(checkAuth.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      localStorage.setItem('token', action.payload.data.accessToken);
      localStorage.setItem('role', action.payload.data.user.role);
      state.isAuth = true;
      localStorage.isAuth = true;
      state.user = action.payload.data.user;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      console.log('ERROR');
      alert(action.payload);
      state.isAuth = false;
      localStorage.isAuth = false;
      state.status = Status.ERROR;
    });

    // Кейсы для запроса данных о пользователе
    // builder.addCase(fetchUser.pending, (state) => {
    //   state.status = Status.LOADING;
    // });
    // builder.addCase(fetchUser.fulfilled, (state, action) => {
    //   state.status = Status.SUCCESS;
    //   state.user = action.payload.data;
    //   localStorage.setItem('role', action.payload.data.role);
    //   console.log('login', action.payload.data.login);
    // });
    // builder.addCase(fetchUser.rejected, (state) => {
    //   console.log('ERROR');
    //   state.status = Status.ERROR;
    // });
  },
});

export const { setUser, setError, setUpdateUserStatus, setImg } = authSlice.actions;
export const SelectAccount = (state: RootState) => state.auth;
export const SelectUser = (state: RootState) => state.auth.user;
export const SelectUserRole = (state: RootState) => state.auth.user.role;
export const SelectAccountID = (state: RootState) => state.auth.user.id_account;

export default authSlice.reducer;
