import { Component, Input, OnInit } from '@angular/core';
import { connection } from './connection';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.css']
})

// Optional third value is dropdown list
export class TableCellComponent {
  // @Input() row: Row;
  @Input('cellvalue') cellvalue: string;
  @Input('selected') selected: boolean;
  // column = 'test';
  constructor() { }

  ngOnInit() {
  }

}
