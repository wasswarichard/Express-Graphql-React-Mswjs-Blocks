import { gql } from '@apollo/client';

const LATEST_BLOCKS = gql`
  query GetLatestBlocks($offset: Int, $limit: Int) {
    latestBlocks(offset: $offset, limit: $limit) {
      items {
        hash
        height
        time
        index
      }
      totalPages
      totalItems
    }
  }
`;

export default LATEST_BLOCKS;
