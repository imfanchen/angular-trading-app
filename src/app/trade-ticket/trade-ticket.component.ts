import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  filter,
  firstValueFrom,
  lastValueFrom,
  map,
  Observable,
  shareReplay,
  take,
} from 'rxjs';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { STOCKS } from '../stocks';
import { StocksService } from '../stocks.service';
import { IStock } from '../types/stock';
import { ITrade, Side } from '../types/trade';

@Component({
  selector: 'app-trade-ticket',
  templateUrl: './trade-ticket.component.html',
  styleUrls: ['./trade-ticket.component.css'],
})
export class TradeTicketComponent {
  @Output() tradeExecuted = new EventEmitter<ITrade>();

  stocks: IStock[] = STOCKS;

  form = new FormGroup({
    stock: new FormControl(undefined, Validators.required),
    amount: new FormControl(undefined, [
      Validators.required,
      Validators.min(0),
    ]),
  });

  prices$: Observable<{ buy: number; sell: number }> = this.form
    .get('stock')
    .valueChanges.pipe(
      filter((stock) => !!stock),
      switchMap((stockName: string) =>
        this.stocksService.getPrices$(stockName)
      ),
      startWith({ buy: undefined, sell: undefined }),
      shareReplay(1)
    );

  constructor(private stocksService: StocksService) {}

  async priceTileClicked(side: Side) {
    const price = (await firstValueFrom(this.prices$))[side.toLowerCase()];
    console.log('Executing transation at price ' + price);
    const { stock, amount } = this.form.value;
    this.tradeExecuted.emit({ side, stock, amount, price });
    this.form.reset();
  }
}
