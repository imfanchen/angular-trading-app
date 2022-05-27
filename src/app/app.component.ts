import { Component } from '@angular/core';
import { IPosition } from './types/position';
import { ITrade } from './types/trade';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  trades: ITrade[] = [];
  positions: IPosition[] = [];

  addTrade(trade: ITrade) {
    this.trades.push(trade);
    this.updatePosition(trade);
  }

  updatePosition(trade: ITrade) {
    const key: string = trade.stock;
    const position: IPosition = this.positions.find((p) => p.stock === key);
    const quantity: number =
      trade.side === 'Buy' ? trade.amount : -trade.amount;
    if (position) {
      position.quantity += quantity;
    } else {
      let p = { stock: key, quantity };
      this.positions.push(p);
    }
  }
}
