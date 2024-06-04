import { createClient } from 'redis';

// const client = createClient({
//     socket: {
//         host: '127.0.0.1',
//         port: 6379
//     }
// });
// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();


export const setKey = async (key, value) => {
    client.set(key, JSON.stringify(value));
    // after every 5 min keys get deleted from redis
    client.expire(key, 60 * 5);
}

export const getValueByKey = async (key) => {
    const cachedData = await client.get(key);
    return JSON.parse(cachedData);
}

// export default client;