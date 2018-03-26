// I could add a selected option to this class
export class Connection {
  constructor(
    public id: number,
    public name: string,
    public status: string,
    public method: string,
    public port?: number,
    public request?: string,
    public address: string,
  ) {  }
}

// Maybe this class can be private, not sure if it would effect html call
// Could add a visible option for this
export class ColumnOption {
  name: string; // the variable name this links to
  header: string;
  selections: list;
  colors: list;
}

// Defines headers and dropdown options for the table
export const OPTIONS: ColumnOption[] = [
  {name: 'name', header: 'Name', selections: [], colors: []},
  {name: 'status', header: 'Status' , selections: ['Running', 'Paused', 'Stopped'], colors: ['green', 'yellow', 'red']},
  {name: 'method', header: 'Communication Method' , selections: ['HTTPS', 'TCP'], colors: []},
  {name: 'request', header: 'Request' , selections: ['PUT', 'POST'], colors: []},
  {name: 'port', header: 'Port' , selections: [], colors: []},
  {name: 'address', header: 'IP or URL Address', selections: [], colors: []},
  {name: 'save', header: '', selections: [], colors: []}
]

export const CONNECTIONS: Connection[] = [
  {id: '1', name: 'Test', status: 'Running', method: 'TCP', request: '', port: '9747', address: '127.0.0.1'},
  {id: '2', name: 'Test2', status: 'Running', method: 'TCP', request: '', port: '9747', address: '127.0.0.1'},
  {id: '3', name: 'Test3', status: 'Running', method: 'TCP', request: '', port: '9747', address: '127.0.0.1'},
  {id: '4', name: 'Connection', status: 'Paused', method: 'HTTPS', request: 'PUT', port: '', address: 'www.connection.com'},
  {id: '5', name: 'Saint Hospital', status: 'Stopped', method: 'HTTPS', request: 'POST', port: '', address: 'www.sthospital.com'},
  {id: '6', name: 'Satan Hospital', status: 'Stopped', method: 'HTTPS', request: 'POST', port: '', address: 'www.satanhospital.com'},
];
