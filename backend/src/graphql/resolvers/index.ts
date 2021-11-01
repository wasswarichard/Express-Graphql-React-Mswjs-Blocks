import { latestBlocks } from './latestBlocks';
import { blockDetails } from './blockDetails';
import { transactions } from './transactions';

const resolvers = {
    Query: {
        latestBlocks,
        blockDetails
    },
    Block: {
        transactions
    }
};

export { resolvers };
