import { Component } from '@angular/core';
import { connection } from './connection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Connections';

  newRow() {
    
    // alert("button clicked!");
  }

}
