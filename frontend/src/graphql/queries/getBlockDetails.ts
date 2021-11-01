import { gql } from '@apollo/client';

const BLOCK_DETAILS = gql`
  query GetBlockDetails($hash: String!, $offset: Int, $limit: Int) {
    blockDetails(hash: $hash) {
      hash
      height
      time
      index
      size
      previousBlock
      transactions(offset: $offset, limit: $limit) {
        items {
          hash
          size
          blockHeight
          index
        }
        totalPages
        totalItems
      }
    }
  }
`;

export default BLOCK_DETAILS;
