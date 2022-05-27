import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { IStock } from './types/stock';
import { interval } from 'rxjs';

@Injectable()
export class StocksService {
  private prices: Record<string, Observable<{ buy: number; sell: number }>> =
    this.getStocks().reduce((acc, stock) => {
      const obs = of(stock).pipe(
        switchMap((stock: IStock) => {
          const initialBuy = stock.initialPrice * 1.01;
          const initialSell = stock.initialPrice * 0.99;
          return interval(500).pipe(
            startWith(undefined),
            map(() => {
              const multiplier = 1 + (Math.random() - 0.5) / 100;
              return {
                buy: Number((initialBuy * multiplier).toFixed(4)),
                sell: Number((initialSell * multiplier).toFixed(4)),
              };
            })
          );
        }),
        startWith({ buy: undefined, sell: undefined }),
        shareReplay(1)
      );
      acc[stock.name] = obs;
      return acc;
    }, {});

  constructor() {}

  getStocks(): IStock[] {
    return [
      { name: 'Stock 1', initialPrice: 1.2531 },
      { name: 'Stock 2', initialPrice: 34.865 },
      { name: 'Stock 3', initialPrice: 0.4316 },
    ];
  }

  getPrices$(stockName: string) {
    return this.prices[stockName];
  }
}
