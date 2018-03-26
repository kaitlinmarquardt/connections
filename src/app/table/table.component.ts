import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import 'rxjs/add/observable/fromEvent';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    public dialog: MatDialog,
    private connectionService: ConnectionService,
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
    this.dataSource = new ConnectionDataSource(this.connectionService, this.paginator, this.sort);
    // Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //   .debounceTime(150)
    //   .distinctUntilChanged()
    //   .subscribe(() => {
    //     if (!this.dataSource) { return; }
    //     this.dataSource.filter = this.filter.nativeElement.value;
    // });


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
        console.log(this.connectionForm.value);
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

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    console.log("after view");

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource.sort);
    // server-side search
         // fromEvent(this.input.nativeElement,'keyup')
         //     .pipe(
         //         debounceTime(150),
         //         distinctUntilChanged(),
         //         tap(() => {
         //             this.paginator.pageIndex = 0;
         //             this.loadLessonsPage();
         //         })
         //     )
         //     .subscribe();

     // // reset the paginator after sorting
     // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
     //
     // // on sort or paginate events, load a new page
     // merge(this.sort.sortChange, this.paginator.page)
     //  .pipe(
     //     tap(() => this.loadConnectionsPage())
     // )
     // .subscribe();

  }

  // loadConnectionsPage() {
  //   this.dataSource.loadConnections(
  //       this.connection.id,
  //       this.input.nativeElement.value,
  //       this.sort.direction,
  //       this.paginator.pageIndex,
  //       this.paginator.pageSize);
  // }

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
    return this.connectionService.connectionChange;
  }

  disconnect() {}


  // get data(): Connection[] { return this.connectionService.connectionChange.value; }
  //
  // _filterChange = new BehaviorSubject('');
  // get filter(): string { return this._filterChange.value; }
  // set filter(filter: string) { this._filterChange.next(filter); }
  //
  // filteredData: Connection[] = [];
  // renderedData: Connection[] = [];
  //
  // constructor(private connectionService: ConnectionService,
  //           private _paginator: MatPaginator,
  //           private _sort: MatSort) {
  // super();
  //
  //   // Reset to the first page when the user changes the filter.
  //   this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  // }

/** Connect function called by the table to retrieve one stream containing the data to render. */
// connect(): Observable<Connection[]> {
//   // Listen for any changes in the base data, sorting, filtering, or pagination
//   const displayDataChanges = [
//     this.connectionService.connectionChange,
//     this._sort.sortChange,
//     this._filterChange,
//     this._paginator.page,
//   ];
//
//   return Observable.merge(...displayDataChanges).map(() => {
//     // Filter data
//     this.filteredData = this.data.slice().filter((item: Connection) => {
//       let searchStr = (item.name + item.color).toLowerCase();
//       return searchStr.indexOf(this.filter.toLowerCase()) != -1;
//     });
//
//     console.log(this.filteredData);
//     // Sort filtered data
//     const sortedData = this.sortData(this.filteredData.slice());
//
//     // Grab the page's slice of the filtered sorted data.
//     const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
//     this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
//     return this.renderedData;
//   });

  /** Returns a sorted copy of the database data. */
  // sortData(data: Connection[]) {
  //   if (!this._sort.active || this._sort.direction == '') { return data; }
  //
  //   return data.sort((a, b) => {
  //     let propertyA: number|string = '';
  //     let propertyB: number|string = '';
  //
  //     switch (this._sort.active) {
  //       case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
  //       case 'status': [propertyA, propertyB] = [a.status, b.status]; break;
  //       case 'method': [propertyA, propertyB] = [a.method, b.method]; break;
  //       case 'request': [propertyA, propertyB] = [a.request, b.request]; break;
  //       case 'port': [propertyA, propertyB] = [a.port, b.port]; break;
  //       case 'address': [propertyA, propertyB] = [a.address, b.address]; break;
  //     }
  //
  //     let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
  //     let valueB = isNaN(+propertyB) ? propertyB : +propertyB;
  //
  //     return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
  //   });
  // }

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
