import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
import { TableCellComponent } from './table-cell.component';

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
  private connectionFormValid: boolean;

  connectionForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private connectionService: ConnectionService
    private fb: FormBuilder) {
      this.createForm();
  }

  createForm() {
    this.connectionForm = this.fb.group({
      name: ['', Validators.required ],
      status: ['', Validators.required ],
      method: ['', Validators.required ],
      request: '',
      port: '',
      address: ['', Validators.required ]
    });
  }

  ngOnChanges() { }

  rebuildForm(connection) {
    this.connectionForm.reset({
      name: connection.name,
      status: connection.status,
      method: connection.method,
      request: connection.request,
      port: connection.port,
      address: connection.address
    });
  }

  ngOnInit() {
    // Make port or request required based on method selected
    this.connectionForm.get('method').valueChanges.subscribe(
      (method: string) => {
        console.log("method subscription change");
        if (method == 'TCP') {
          this.connectionForm.get('request').setValidators();
          this.connectionForm.get('port').setValidators([Validators.required, Validators.min(0), Validators.max(65535)]);
          this.connectionForm.patchValue({request: ''});
          // connection.request = '';
          this.connectionForm.get('port').updateValueAndValidity();
        } else if (method == 'HTTPS') {
          this.connectionForm.get('port').setValidators();
          this.connectionForm.get('request').setValidators(Validators.required);
          this.connectionForm.patchValue({port: ''});
          // connection.port = '';
          this.connectionForm.get('request').updateValueAndValidity();
        }
        console.log(this.connectionForm.value;
      });
  }

  // Convert row into form, happens at table-cell level
  handleRowClick(connection) {
    if (connection.id != this.selectedRowIndex) {
      if (connection.status == "Running") {
        const dialogRef = this.dialog.open(RunningStatusDialogComponent, {
          height: '200px',
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result != '') { // They paused or stopped the connection
            connection.status = result;
            this.selectedRowIndex = connection.id;
            // console.log(`Dialog result: ${result}`);
            // console.log(this.selectedRowIndex);
            this.rebuildForm(connection);
          }
        });
      } else { // Turns on editing/form
        this.selectedRowIndex = connection.id;
        this.rebuildForm(connection);
      }
    }
    console.log("row clicked");
    console.log(connection);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    // console.log("after view");
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
    this.savingConnection = true;
    this.connectionForm.value.id = this.selectedRowIndex;
    this.connectionService.updateConnection(this.connectionForm.value);
    this.selectedRowIndex = -1;
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
