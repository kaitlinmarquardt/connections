import { Component } from '@angular/core';

import { Connection, CONNECTIONS } from './connection';
import { ConnectionService } from './connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Connections';

  constructor(private connectionService: ConnectionService) { }

  newConnection() {
    this.connectionService.addConnection();
  }

}
