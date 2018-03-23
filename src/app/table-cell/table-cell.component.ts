import { Component, Input, OnInit } from '@angular/core';
import { Connection } from './connection';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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

  connectionForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
    console.log(this.connectionForm);
  }
    // var name = new FormControl('', [Validators.required]);

    // getErrorMessage() {
    //   // console.log("uh oh error");
    //   return this.column.hasError('required') ? 'You must enter a value' : '';
    // }

  ngOnInit() {
  }

  // Need to clear port or request fields if method changes
  onTableCellChange() {
    // Need to switch validation?
    console.log("cell change");
    console.log(this.connectionForm.request);
    if (this.column == "method") {
      if (this.connection.method == "TCP") {
        this.connection.request = "";
      } else { // HTTPS
        this.connection.port = "";
      }
    }
  }
}
