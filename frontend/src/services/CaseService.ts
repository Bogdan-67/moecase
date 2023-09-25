import $api from '@/http';
import { ICase } from '@/models/ICase';
import { AxiosResponse } from 'axios';

export default class CaseService {
  static async getCaseById(id: number): Promise<AxiosResponse<ICase>> {
    return $api.get<ICase>(`case/${id}`);
  }

  static async getAllCases(): Promise<AxiosResponse<ICase[]>> {
    return $api.get<ICase[]>(`cases`);
  }
}
