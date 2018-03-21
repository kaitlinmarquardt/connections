import { Injectable } from '@angular/core';

import { Connection, CONNECTIONS } from './connection';

@Injectable()
export class ConnectionService {

  constructor() { }

  // Use observable module if fetching from server
  getConnections(): connection[] {
    return (CONNECTIONS);
  }

}
