import { Component, Input, OnInit } from '@angular/core';
import { ITrade } from '../types/trade';

@Component({
  selector: 'app-trade-blotter',
  templateUrl: './trade-blotter.component.html',
  styleUrls: ['./trade-blotter.component.css']
})
export class TradeBlotterComponent {

  @Input() trades: ITrade[];

}