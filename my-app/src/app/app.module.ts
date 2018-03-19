import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTable } from '@angular/material';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    BrowserModule, MatTable
  ],
  exports: [
    MatTable
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
