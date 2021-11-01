import { graphql } from 'msw';

import latestBlocks from './mockData/latestBlocks';
import blockDetails from './mockData/blockDetails';

const getLatestBlocks = graphql.query('GetLatestBlocks', (req, res, ctx) => {
  return res(ctx.status(200), ctx.data(latestBlocks.data));
});

const getBlockDetails = graphql.query('GetBlockDetails', (req, res, ctx) => {
  return res(ctx.status(200), ctx.data(blockDetails.data));
});

const mockApiHandlers = [getLatestBlocks, getBlockDetails];

export default mockApiHandlers;
