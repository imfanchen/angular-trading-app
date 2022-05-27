import { Component, Input, OnInit } from '@angular/core';
import { IPosition } from '../types/position';

@Component({
  selector: 'app-position-blotter',
  templateUrl: './position-blotter.component.html',
  styleUrls: ['./position-blotter.component.css'],
})
export class PositionBlotterComponent {
  @Input() positions: IPosition[];
}
