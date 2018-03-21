export class Connection {
  public id: number,
  public name: string,
  public status: string,
  public method: string,
  public port?: number,
  public request?: string,
  public address: string,
}

// Maybe this class can be private, not sure if it would effect html call
// Could add a visible option for this
export class ColumnOption {
  public name: string, // the variable name this links to
  public header: string,
  public options: list,
}

// If it's a string input it's empty
export const OPTIONS: ColumnOption[] = [
  {name: 'name', header: 'Name', options: []},
  {name: 'status', header: 'Status' , options: ['Running', 'Paused', 'Stopped']}, // To do: green/yellow/red or maybe icons
  {name: 'method', header: 'Communication Method' , options: ['HTTPS', 'TCP']},
  {name: 'port', header: 'Port' , options: []},
  {name: 'request', header: 'Request' , options: ['PUT', 'POST']},
  {name: 'address', header: 'IP or URL Address', options: []},
]

export const CONNECTIONS: Connection[] = [
  {id: '1', name: 'Test', status: 'Running', method: 'TCP', request: '', port: '9747', address: '127.0.0.1'},
  {id: '2', name: 'Test2', status: 'Running', method: 'TCP', request: '', port: '9747', address: '127.0.0.1'},
  {id: '3', name: 'Test3', status: 'Running', method: 'TCP', request: '', port: '9747', address: '127.0.0.1'},
  {id: '4', name: 'Connection', status: 'Paused', method: 'HTTPS', request: 'PUT', port: '', address: 'www.connection.com'},
  {id: '5', name: 'Saint Hospital', status: 'Stopped', method: 'HTTPS', request: 'POST', port: '', address: 'www.sthospital.com'},
  {id: '6', name: 'Satan Hospital', status: 'Stopped', method: 'HTTPS', request: 'POST', port: '', address: 'www.satanhospital.com'},
];
