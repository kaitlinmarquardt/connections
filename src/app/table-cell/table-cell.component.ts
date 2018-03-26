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

  constructor() { }

  ngOnInit() { }

  ngOnChanges() { }

  getColor(value, options) {
    let color = options.colors[ options.selections.indexOf(value)];
    return color;
  }
}
