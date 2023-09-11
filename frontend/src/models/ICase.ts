import { IItem } from './IItem';

export interface ICase {
  id_case: number;
  name: string;
  price: number;
  group_id: number;
  items: IItem[];
}
