import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

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
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  // Could change this list for column selection feature,
  // would have to change the loop in the table template though
  // I would add a column for display/hide in the OPTIONS object and the database
  // This has to match the order in OPTIONS
  displayedColumns = ['name', 'status', 'method', 'request', 'port', 'address', 'save'];
  options = OPTIONS;
  dataSource = new ConnectionDataSource(this.connectionService);
  selectedRowIndex: number = -1;
  savingConnection = false;

  // resultsLength = 0;
  // isLoadingResults = true;
  // isRateLimitReached = false;

  constructor(
    public dialog: MatDialog,
    public connectionService: ConnectionService
  ) { }

  ngOnChanges() { console.log("ngOnChanges"); }

  update($event) {
    console.log("update");
    console.log($event, $event.target, $event.currentTarget);
  }

  ngOnInit() {
    // this.dataSource = new ConnectionDataSource(this.connectionService);
    // // If the user changes the sort order, reset back to the first page.
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    //
    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       this.isLoadingResults = true;
    //       return this.exampleDatabase!.getRepoIssues(
    //         this.sort.active, this.sort.direction, this.paginator.pageIndex);
    //     }),
    //     map(data => {
    //       // Flip flag to show that loading has finished.
    //       this.isLoadingResults = false;
    //       this.isRateLimitReached = false;
    //       this.resultsLength = data.total_count;
    //
    //       return data.items;
    //     }),
    //     catchError(() => {
    //       this.isLoadingResults = false;
    //       // Catch if the GitHub API has reached its rate limit. Return empty data.
    //       this.isRateLimitReached = true;
    //       return observableOf([]);
    //     })
    //   ).subscribe(data => this.dataSource.data = data);
  }

  // Convert row into form, happens at table-cell level
  handleRowClick(connection) {
    // Save button was clicked, disables row input
    if (this.savingConnection == true) {
      // Set save button back to false
      this.savingConnection = false;
      // Disable row input
      this.selectedRowIndex = -1;
    } else {
      if (connection.status == "Running") {
        const dialogRef = this.dialog.open(RunningStatusDialogComponent, {
          height: '200px',
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result != '') { // They paused or stopped the connection
            connection.status = result;
            this.selectedRowIndex = connection.id;
            console.log(`Dialog result: ${result}`);
            console.log(this.selectedRowIndex);
          }
        });
      } else { // Turns on editing/form
        this.selectedRowIndex = connection.id;
      }
      console.log("row clicked");
      // console.log(connection);
    }
  }

  saveConnectionClick() {
    this.savingConnection = true;
    console.log("save connection");
    // Potential database edit through the service
    // this.connectionService.upDateConnection();
  }

  // Need to clear port or request fields if method changes
  // tableCellClick(connection, column) {
  //   if (column == "method") {
  //     console.log("method cell clicked");
  //   }
  // }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    console.log("after view");
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  // Optional, filter is hidden right now
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }

  onSubmit() {
    // Data is being autosaved by row, but they could have the choice to save/submit all the connections
  };

}

// This class sets up a stream through the service
export class ConnectionDataSource extends MatTableDataSource<any> {
  constructor(private connectionService: ConnectionService) {
    super();
  }

  connect(): Observable<Connection[]> {
    // Need to update for sort/paginator to work
    // const changes = [
    //   this.recordChange$
    // ];
    //
    // return Observable.merge(this.sort.sortChange).map(() => {
    // return Observable.merge(...changes)
    //   .switchMap(() => return Observable.of(this.connectionService));
    return this.connectionService.connectionChange;
  }

  disconnect() {}

  // loadConnections(connectionId: number, filter: string,
  //               sortDirection: string, pageIndex: number, pageSize: number) {
  //     ...
  //   }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `
  <h2 mat-dialog-title>Edit A Running Connection</h2>
  <div mat-dialog-content>Would you like to pause or stop this connection?</div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Cancel</button>
    <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
    <button mat-button [mat-dialog-close]="Paused" (click)="onPauseClick()">Pause</button>
    <button mat-button [mat-dialog-close]="Stopped" (click)="onStopClick()">Stop</button>
  </div>
`,
})
export class RunningStatusDialogComponent {

  constructor(public dialogRef: MatDialogRef<RunningStatusDialogComponent>) { }

  onClick(): void {
    this.dialogRef.close();
  }
  onPauseClick(): void {
    this.dialogRef.close("Paused");
  }
  onStopClick(): void {
    this.dialogRef.close("Stopped");
  }
}
