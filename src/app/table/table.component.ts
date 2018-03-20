import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { connection } from './connection';

/**
 * @title Table
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  handleTableClick() {
    alert("Table clicked!");
  }

  handleCellClick() {
    alert("Cell clicked!");
  }

  displayedColumns = ['name', 'status', 'method', 'request', 'port', 'address'];
  // These constants could be in connection.ts and set up with a service
  statuses = ['Running', 'Paused', 'Stopped']; // To do: green/yellow/red or maybe icons
  methods = ['HTTPS', 'TCP'];
  requests = ['PUT', 'POST'];
  dataSource = new MatTableDataSource(connections);

  handleRowClick() {
    alert("Row clicked!");
    console.log("here");
    // this.selectedConnection = connection;
  }

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

  // TODO: Remove this when we're done
  // get diagnostic() { return JSON.stringify(this.model); }

  setName(nameInput: string) {
    alert("name was set");
  }

}

export interface Connection {
  name: string;
  status: string;
  method: string;
  port: number;
  request: string;
  address: string;
}

export const connections: Connection[] = [
  {name: 'Test', status: 'Running', method: 'TCP', request: '', port: '9747', address: '127.0.0.1'},
  {name: 'Test2', status: 'Running', method: 'TCP', request: '', port: '9747', address: '127.0.0.1'},
  {name: 'Test3', status: 'Running', method: 'TCP', request: '', port: '9747', address: '127.0.0.1'},
  {name: 'Connection', status: 'Paused', method: 'HTTPS', request: 'PUT', port: '', address: 'www.connection.com'},
  {name: 'Saint Hospital', status: 'Stopped', method: 'HTTPS', request: 'POST', port: '', address: 'www.sthospital.com'},
  {name: 'Satan Hospital', status: 'Stopped', method: 'HTTPS', request: 'POST', port: '', address: 'www.satanhospital.com'},
];
