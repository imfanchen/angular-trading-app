import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TradeTicketComponent } from './trade-ticket/trade-ticket.component';
import { TradeBlotterComponent } from './trade-blotter/trade-blotter.component';
import { PositionBlotterComponent } from './position-blotter/position-blotter.component';
import { StocksService } from './stocks.service';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    TradeTicketComponent,
    TradeBlotterComponent,
    PositionBlotterComponent,
  ],
  providers: [StocksService],
  bootstrap: [AppComponent],
})
export class AppModule {}
