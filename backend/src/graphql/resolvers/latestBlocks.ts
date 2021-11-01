import { getLatestBlocks } from '../../api/blockchainInfo';
import {
    formatToListofBlocks,
    formatToPaginatedResponse
} from '../../utils/blockchainDataProcessor';
import { Block } from '../../types';

interface Args {
    offset?: number;
    limit?: number;
}

export const latestBlocks = async (_: any, args: Args) => {
    const data = await getLatestBlocks();

    const formattedData = formatToListofBlocks(data);

    return formatToPaginatedResponse<Block>(
        args.offset,
        args.limit,
        formattedData
    );
};
