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
  displayedColumns = ['name', 'status', 'method', 'request', 'port', 'address'];
  // These constants could be in connection.ts and set up with a service
  statuses = ['Running', 'Paused', 'Stopped']; // To do: green/yellow/red or maybe icons
  methods = ['HTTPS', 'TCP'];
  requests = ['PUT', 'POST'];
  dataSource = new MatTableDataSource(connections);
  // selectedRow: Row; // Object structure initialized?
  // this.selectedRow = undefined;

  selectedRowIndex: number = -1;

  // Convert row into form
  handleRowClick(row) {
    this.selectedRowIndex = row.id;
    // this.selectedRow = row;
    console.log(row);
    // console.log(this);
    // alert("Row clicked!");

    // Hide existing cell value div, show form input
    // Don't want to use toggle, in case they click in same row
    // Document.getElementsByClassName(".mat-cell").css = ("visibility", "hidden")
    // $(".cell").css = ("visibility", "hidden");
    // $('.form'+String(row.id)).style.visibility = "visible";
    // If this is unclicking another row..
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
}

export interface Connection {
  id: number;
  name: string;
  status: string;
  method: string;
  port: number;
  request: string;
  address: string;
}

export const connections: Connection[] = [
  {id: '1', name: 'Test', status: 'Running', method: 'TCP', request: '', port: '9747', address: '127.0.0.1'},
  {id: '2', name: 'Test2', status: 'Running', method: 'TCP', request: '', port: '9747', address: '127.0.0.1'},
  {id: '3', name: 'Test3', status: 'Running', method: 'TCP', request: '', port: '9747', address: '127.0.0.1'},
  {id: '4', name: 'Connection', status: 'Paused', method: 'HTTPS', request: 'PUT', port: '', address: 'www.connection.com'},
  {id: '5', name: 'Saint Hospital', status: 'Stopped', method: 'HTTPS', request: 'POST', port: '', address: 'www.sthospital.com'},
  {id: '6', name: 'Satan Hospital', status: 'Stopped', method: 'HTTPS', request: 'POST', port: '', address: 'www.satanhospital.com'},
];
