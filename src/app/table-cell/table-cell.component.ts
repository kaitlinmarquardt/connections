import { Component, Input, OnInit } from '@angular/core';
import { connection, CONNECTIONOPTIONS } from './connection';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.css']
})

export class TableCellComponent {
  @Input('connection') connection: Connection[];
  @Input('column') column: string;
  @Input('options') options: list;
  @Input('selected') selected: boolean;

  constructor() { }

  ngOnInit() {
  }

  // Need to clear port or request fields if method changes
  onTableCellChange() {
    if (this.column == "method") {
      if (this.connection.method == "TCP") {
        this.connection.request = "";
      } else { // HTTPS
        this.connection.port = "";
      }
    }
  }

  // email = new FormControl('', [Validators.required, Validators.email]);
  //
  // getErrorMessage() {
  //   return this.email.hasError('required') ? 'You must enter a value' :
  //     this.email.hasError('email') ? 'Not a valid email' :
  //         '';
  // }

}
