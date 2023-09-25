import { IStock } from './IStock';

export interface ICase {
  id_case: number;
  name: string;
  price: number;
  group_id: number;
  items: IStock[];
}
