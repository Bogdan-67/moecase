export interface IStock {
  id_stock: number;
  ticker: string;
  name: string;
  description: string;
  logo: string | File;
  color: string;
  price?: number;
}

export interface IStockData {
  stocks: IStock[];
}
