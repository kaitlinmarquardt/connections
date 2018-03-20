import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { MatToolbarModule, MatCardModule, MatTableModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule
  ],
  // exports: [
  //   MatTable
  // ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
