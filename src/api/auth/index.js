import client from '../client';
import clietn from '../client';

export const login = async (username) => {
    const res = await client.post('login', {
        username
    });

    return res.data;
}