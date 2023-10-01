import $api from '../http';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export default class AuthService {
  static async login(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('login', { login, password });
  }

  static async registration(
    login: string,
    username: string,
    password: string,
    email: string,
    recaptha: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('registration', {
      login,
      username,
      password,
      email,
      ['g-recaptcha-response']: recaptha,
    });
  }

  static async logout(): Promise<void> {
    return $api.post('logout');
  }
}
