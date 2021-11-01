export interface Transaction {
    hash: string;
    size: number;
    blockHeight: number;
    index: string;
    relayedBy: string;
}

export interface Block {
    hash: string;
    height: number;
    time: number;
    index: number;
    size?: number;
    previousBlock?: string;
    transactions?: Transaction[];
}

export interface PaginatedResponse<T> {
    items: T[];
    totalPages: number;
    totalItems: number;
}

export interface TransactionApiResponse {
    hash: string;
    size: number;
    block_height: number;
    tx_index: string;
    relayed_by: string;
}

export interface BlockApiResponse {
    hash: string;
    height: number;
    time: number;
    block_index: number;
    size: number;
    prev_block: string;
    tx: TransactionApiResponse[];
}
