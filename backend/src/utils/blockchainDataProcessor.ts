import {
    BlockApiResponse,
    Block,
    PaginatedResponse,
    TransactionApiResponse,
    Transaction
} from '../types';

export const formatToPaginatedResponse = <T>(
    offset: number = 0,
    limit: number = 10,
    data: any[]
): PaginatedResponse<T> => {
    const paginatedItems = data.slice(offset).slice(0, limit);
    const totalPages = Math.ceil(data.length / limit);
    const totalItems = data.length;

    return {
        items: paginatedItems,
        totalPages,
        totalItems
    };
};

export const formatToListofBlocks = (data: BlockApiResponse[]): Block[] => {
    return data.map(({ hash, height, time, block_index }: BlockApiResponse) => {
        return {
            hash,
            height,
            time,
            index: block_index
        };
    });
};

export const formatToBlockDetails = ({
    hash,
    height,
    time,
    block_index,
    size,
    prev_block,
    tx
}: BlockApiResponse): any => {
    return {
        hash,
        height,
        time,
        index: block_index,
        size,
        previousBlock: prev_block,
        transactions: tx
    };
};

export const formatToListofTransactions = (
    data: TransactionApiResponse[]
): Transaction[] => {
    return data.map(
        ({
            hash,
            size,
            block_height,
            tx_index,
            relayed_by
        }: TransactionApiResponse) => {
            return {
                hash,
                size,
                blockHeight: block_height,
                index: tx_index,
                relayedBy: relayed_by
            };
        }
    );
};
