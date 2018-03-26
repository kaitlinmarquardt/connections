import { Component, Input, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Connection } from './connection';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.css']
})

export class TableCellComponent implements OnInit, OnChanges {
  @Input('connection') connection: Connection[];
  @Input('column') column: string;
  @Input('options') options: list;
  @Input('selected') selected: boolean;
  @Input('connectionForm') connectionForm: FormGroup;
  @Output() isCellFormValid = new EventEmitter<boolean>();
  // private isValid: boolean;

  constructor() {

  }
  ngOnInit() {
    this.connectionForm.valueChanges.subscribe(() => {
          this.isCellFormValid.emit(this.connectionForm.valid)
        });
  }

  ngOnChanges() {
    // console.log("on changes");
    // console.log(this.connectionForm.form.valid);
  }

  // Need to clear port or request fields if method changes
  onTableCellSelectionChange(connection) {
    // Need to switch validation?

    // console.log(this.connectionForm.valid);
    if (this.column == "method") {
      console.log("selection cell method change");
      // if (connection.method == "TCP") {
      //   connection.request = "";
      // } else { // HTTPS
      //   connection.port = "";
      // }
    }
    // console.log(connection);
  }

  // Need to clear port or request fields if method changes
  onTableCellInputChange(inputConnectionForm) {
    // Need to switch validation?
    // console.log("input cell change");
    // console.log(this.connectionForm.valid);
    // console.log(this.inputConnectionForm.status);
    // console.log(this.tableCellConnectionForm.valid);
    // this.connectionFormValidChange.emit(this.tableCellConnectionForm.valid);
  }
}
