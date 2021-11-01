import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const BLOCKCHAIN_API_ENDPOINT = process.env.BLOCKCHAIN_API_ENDPOINT;

export const getLatestBlocks = async () => {
    const timeInMilliseconds =
        (Math.round(new Date().getTime() / 1000) - 24 * 3600) * 1000; // yesterday in milliseconds

    const response = await fetch(
        `${BLOCKCHAIN_API_ENDPOINT}/blocks/${timeInMilliseconds}?format=json`
    );

    const data = await response.json();

    return data;
};

export const getBlockDetails = async (hash: string) => {
    const response = await fetch(`${BLOCKCHAIN_API_ENDPOINT}/rawblock/${hash}`);

    const data = await response.json();

    return data;
};
