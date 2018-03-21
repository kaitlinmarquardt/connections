import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Connection, CONNECTIONS, OPTIONS } from '../connection';
import { ConnectionService } from '../connection.service';

/**
 * @title Table
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  // Could change this list for column selection feature,
  // would have to change the loop in the table template though
  // I would add a column for display/hide in the OPTIONS object and the database
  displayedColumns = ['name', 'status', 'method', 'request', 'port', 'address'];
  options = OPTIONS;
  dataSource = new MatTableDataSource(CONNECTIONS); // Timing issue with service...
  selectedRowIndex: number = -1;

  connections: Connection[];
  constructor(private connectionService: ConnectionService) { }
  ngOnInit() {
    this.getConnections();
  }
  getConnections(): void {
    this.connections = this.connectionService.getConnections();
    // If fetching from server with Observable:
    // this.connectionService.getConnections();
      // .subscribe(connections => this.connections = connections);
  }

  // Convert row into form, happens at table-cell level
  handleRowClick(row) {
    this.selectedRowIndex = row.id;
    console.log(row);
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
