import client from '../client';
import clietn from '../client';

export const login = async (partnerId) => {
    const res = await client.post('login');

    return res.data;
}