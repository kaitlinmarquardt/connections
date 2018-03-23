import { Component, Input, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Connection } from './connection';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.css']
})

export class TableCellComponent implements OnInit {
  @Input('connection') connection: Connection[];
  @Input('column') column: string;
  @Input('options') options: list;
  @Input('selected') selected: boolean;
  @Input('tableCellConnectionForm') tableCellConnectionForm: NgForm;
  @Output() connectionFormValidChange = new EventEmitter<boolean>();
  private validStatus: boolean;

  ngOnInit() {
    // console.log("valid status"+validStatus);
    // if (!this.tableCellConnectionForm) return;
    this.tableCellConnectionForm.valueChanges
      .subscribe(val => {
        if(this.validStatus !== this.tableCellConnectionForm.valid) {
          console.log("table cell subscription");
          console.log(val);
          this.validStatus = this.tableCellConnectionForm.valid;
          this.connectionFormValidChange.emit(this.tableCellConnectionForm.valid);
      });
  }

  // Need to clear port or request fields if method changes
  onTableCellSelectionChange() {
    // Need to switch validation?
    console.log("selection cell change");
    console.log(this.tableCellConnectionForm.valid);
    if (this.column == "method") {
      if (this.connection.method == "TCP") {
        this.connection.request = "";
      } else { // HTTPS
        this.connection.port = "";
      }
    }
  }

  // Need to clear port or request fields if method changes
  onTableCellInputChange() {
    // Need to switch validation?
    console.log("input cell change");
    // console.log(this.tableCellConnectionForm.valid);
    // this.connectionFormValidChange.emit(this.tableCellConnectionForm.valid);
  }
}
