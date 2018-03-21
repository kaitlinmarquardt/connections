import { Component, Input, OnInit } from '@angular/core';
import { connection, CONNECTIONOPTIONS } from './connection';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.css']
})

export class TableCellComponent {
  @Input('connection') connection: Connection[];
  @Input('column') column: string;
  @Input('options') options: list;
  @Input('selected') selected: boolean;

  constructor() { }

  ngOnInit() {
  }
  
}
