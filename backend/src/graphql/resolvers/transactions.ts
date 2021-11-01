import {
    formatToListofTransactions,
    formatToPaginatedResponse
} from '../../utils/blockchainDataProcessor';
import { TransactionApiResponse } from '../../types';

interface Args {
    offset?: number;
    limit?: number;
}

export const transactions = async (blockDetails: any, args: Args) => {
    const { transactions } = blockDetails;

    const paginatedTransactions =
        formatToPaginatedResponse<TransactionApiResponse>(
            args.offset,
            args.limit,
            transactions
        );

    const formattedTransactions = formatToListofTransactions(
        paginatedTransactions.items
    );

    return {
        items: formattedTransactions,
        totalPages: paginatedTransactions.totalPages,
        totalItems: paginatedTransactions.totalItems
    };
};
