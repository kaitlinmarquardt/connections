import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

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

export class TableComponent implements OnInit, OnChanges {
  // Could change this list for column selection feature,
  // would have to change the loop in the table template though
  // I would add a column for display/hide in the OPTIONS object and the database
  // This has to match the order in OPTIONS
  displayedColumns = ['name', 'status', 'method', 'request', 'port', 'address'];
  options = OPTIONS;
  dataSource = new ConnectionDataSource(this.connectionService);
  selectedRowIndex: number = -1;

  constructor(private connectionService: ConnectionService) { }

  ngOnChanges() { }

  ngOnInit(): void { }

  // I need code that clears another cell

  // Convert row into form, happens at table-cell level
  handleRowClick(connection) {
    // if (row.status == "Running") {
    //
    // } else {
      this.selectedRowIndex = connection.id;
    // }
    // this.connectionService.upDateConnection();
    console.log("row clicked")
    console.log(connection);
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

  // Optional, filter is hidden right now
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }
}

export class ConnectionDataSource extends MatTableDataSource<any> {
  constructor(private connectionService: ConnectionService) {
    super();
  }
  connect(): Observable<Connection[]> {
    return this.connectionService.connectionChange;
  }
  disconnect() {}
}
