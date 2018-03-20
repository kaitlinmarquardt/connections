import { Component, OnInit } from '@angular/core';

/**
 * @title Table
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  displayedColumns = ['name', 'status', 'method'];
  dataSource = ELEMENT_DATA;
}

export interface Element {
  name: string;
  status: string;
  method: string;
}

const ELEMENT_DATA: Element[] = [
  {name: 'Test', status: 'running', method: 'TCP'},
];

// export class TableComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }
