import nock from 'nock';

import { mockLatestBlocks, mockBlockDetails } from './mocks';

beforeEach(() => {
    const BLOCKCHAIN_API_ENDPOINT = process.env
        .BLOCKCHAIN_API_ENDPOINT as string;

    nock(BLOCKCHAIN_API_ENDPOINT)
        .get(/blocks/)
        .reply(200, mockLatestBlocks);

    nock(BLOCKCHAIN_API_ENDPOINT)
        .get(/rawblock/)
        .reply(200, mockBlockDetails);
});
