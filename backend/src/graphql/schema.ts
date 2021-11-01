import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    enum CacheControlScope {
        PUBLIC
        PRIVATE
    }

    directive @cacheControl(
        maxAge: Int
        scope: CacheControlScope
    ) on OBJECT | FIELD | FIELD_DEFINITION

    type Transaction {
        hash: String!
        size: Int!
        blockHeight: Int!
        index: String!
        relayedBy: String!
    }

    type Block @cacheControl {
        hash: String!
        height: Int!
        time: Int!
        index: Int!
        size: Int
        previousBlock: String
        transactions(offset: Int, limit: Int): PaginatedTransactions
    }

    type PaginatedBlocks @cacheControl {
        items: [Block]!
        totalPages: Int!
        totalItems: Int!
    }

    type PaginatedTransactions {
        items: [Transaction]!
        totalPages: Int!
        totalItems: Int!
    }

    type Query {
        latestBlocks(offset: Int, limit: Int): PaginatedBlocks
        blockDetails(hash: String!): Block
    }
`;
