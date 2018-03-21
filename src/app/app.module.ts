import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import {
  MatToolbarModule,
  MatCardModule,
  MatTableModule,
  MatMenuModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { TableCellComponent } from './table-cell/table-cell.component';
import { ConnectionService } from './connection.service'

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableCellComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  exports: [
  ],
  providers: [
    ConnectionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
