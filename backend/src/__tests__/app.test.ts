import request from 'supertest';

import { app } from '../app';

describe('Tests for GraphQL queries', () => {
    const getLatestBlocksQuery = (offset: number = 0, limit: number = 5) => ({
        query: `{ 
            latestBlocks(offset: ${offset}, limit: ${limit}) { 	
                items { 
                    hash 
                    height 
                    time 
                    index 
                }
                totalPages
                totalItems
            } 
        }`
    });

    const getBlockDetailsQuery = (
        hash: string,
        offset: number = 0,
        limit: number = 5
    ) => ({
        query: `{
            blockDetails(hash: "${hash}") {
                hash
                height
                time
                index
                size
                previousBlock
                transactions(offset: ${offset}, limit: ${limit}) {
                    items {
                        hash
                        size
                        blockHeight
                        index
                        relayedBy
                    }
                    totalPages
                    totalItems
                }
            }
        }`
    });

    it('should return a list of blocks', () => {
        return request(app)
            .post('/graphql')
            .send(getLatestBlocksQuery())
            .expect(200)
            .expect(res => {
                const {
                    latestBlocks: { items, totalPages, totalItems }
                } = res.body.data;

                expect(items.length).toBe(5);
                expect(totalPages).toBe(2);
                expect(totalItems).toBe(10);
            });
    });

    it('should return a list of blocks from an offset value', () => {
        return request(app)
            .post('/graphql')
            .send(getLatestBlocksQuery(5, 3))
            .expect(200)
            .expect(res => {
                const {
                    latestBlocks: { items, totalPages, totalItems }
                } = res.body.data;

                expect(items.length).toBe(3);
                expect(totalPages).toBe(4);
                expect(totalItems).toBe(10);
                expect(items[0].hash).toBe(
                    '0000000000000000000915ef354f0e6dc2d47c0a46b232225d8a3eacf33ed5ad'
                );
            });
    });

    it('should return details of a given block', () => {
        return request(app)
            .post('/graphql')
            .send(
                getBlockDetailsQuery(
                    '0000000000000000000efcea1cc1a169955e9cf6f039ddeabfdd1da1ac6d9899'
                )
            )
            .expect(200)
            .expect(res => {
                const {
                    hash,
                    height,
                    previousBlock,
                    transactions: { items }
                } = res.body.data.blockDetails;

                expect(hash).toBe(
                    '0000000000000000000efcea1cc1a169955e9cf6f039ddeabfdd1da1ac6d9899'
                );
                expect(height).toBe(603966);
                expect(previousBlock).toBe(
                    '0000000000000000000ee40dc80e8ddd28d6389ba8dd59bb147b48d8f7a87f13'
                );
                expect(items.length).toBe(5);
            });
    });

    it('should return a list of transactions from an offset value', () => {
        return request(app)
            .post('/graphql')
            .send(
                getBlockDetailsQuery(
                    '0000000000000000000efcea1cc1a169955e9cf6f039ddeabfdd1da1ac6d9899',
                    5,
                    3
                )
            )
            .expect(200)
            .expect(res => {
                const {
                    transactions: { items, totalPages, totalItems }
                } = res.body.data.blockDetails;

                expect(items.length).toBe(3);
                expect(totalPages).toBe(4);
                expect(totalItems).toBe(10);
                expect(items[0].hash).toBe(
                    '2cf30d38c3cec3acd3b299189c0c38576ba1031c321fa874d1792ab3020f6c34'
                );
            });
    });
});
