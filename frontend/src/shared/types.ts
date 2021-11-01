export interface ColumnConfig {
  name: string;
  label: string;
}

export interface PaginatedResult<T> {
  items: T[];
  totalPages: number;
  totalItems: number;
}

export interface Transaction {
  hash: string;
  size: number;
  blockHeight: number;
  index: number;
  relayedBy: number;
}

export interface Block {
  hash: string;
  height: number;
  time: number;
  index: number;
  size: number;
  previousBlock?: string;
  transactions?: PaginatedResult<Transaction>;
}
