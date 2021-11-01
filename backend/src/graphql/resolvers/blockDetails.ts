import { getBlockDetails } from '../../api/blockchainInfo';
import { formatToBlockDetails } from '../../utils/blockchainDataProcessor';

interface Args {
    hash: string;
}

export const blockDetails = async (_: any, args: Args) => {
    const data = await getBlockDetails(args.hash);

    const formattedData = formatToBlockDetails(data);

    return formattedData;
};
