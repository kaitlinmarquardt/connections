import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

/**
 * @title Table
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  displayedColumns = ['name', 'status', 'method', 'value1', 'value2'];
  dataSource = new MatTableDataSource(CONNECTION_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

export interface Connection {
  name: string;
  status: string;
  method: string;
  value1: string;
  value2: string;
}

const CONNECTION_DATA: Connection[] = [
  {name: 'Test', status: 'Running', method: 'TCP', value1: '9747', value2: '127.0.0.1'},
  {name: 'Test2', status: 'Running', method: 'TCP', value1: '9747', value2: '127.0.0.1'},
  {name: 'Test3', status: 'Running', method: 'TCP', value1: '9747', value2: '127.0.0.1'},
  {name: 'Connection', status: 'Paused', method: 'HTTPS', value1: 'PUT', value2: 'www.connection.com'},
  {name: 'Saint Hospital', status: 'Stopped', method: 'HTTPS', value1: 'POST', value2: 'www.sthospital.com'},
  {name: 'Satan Hospital', status: 'Stopped', method: 'HTTPS', value1: 'POST', value2: 'www.satanhospital.com'},
];

// export class TableComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }
