export type Side = 'Buy' | 'Sell';

export interface ITrade {
  side: Side;
  stock: string;
  amount: number;
  price: number;
}
