import client from '../client';

export const getRoomList = async () => {
    const res = await client.get('/rooms');

    return res.data;
};

export const createRoom = async ({ 
    number, 
    name, 
    colSeatCount, 
    rowSeatCount,
    partnerId
}) => {
    const res = await client.post('/rooms', {
        number,
        name,
        colSeatCount,
        rowSeatCount,
        partnerId
    });

    return res.data;
}