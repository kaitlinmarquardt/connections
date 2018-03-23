import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

import { Connection, CONNECTIONS } from './connection';

@Injectable()
export class ConnectionService {

  connectionChange: connectionDataSource<Connection[]> = new BehaviorSubject<Connection[]>([]);

  constructor() {
    this.connectionChange.next(CONNECTIONS);
  }

  addConnection() {
    console.log("Adding connection");
    console.log(this.connectionChange.value);
    // Get max ID
    const current = this.connectionChange.value.slice();
    let maxID = +current[current.length - 1].id;
    current.push(new Connection( (maxID+1) ));
    // Set stream as new connection
    this.connectionChange.next(current);
    console.log("updated");
    console.log(this.connectionChange.value);
    return (maxID+1);
  }

  // Not used because of 2 way data binding at the cell level
  updateConnection(connection: Connection) {
    console.log("update connection");
    // this.ConnectionDataSource.next(connection);
  }

}
