import client from '../client';

export const getRoomList = async (partnerId) => {
    const res = await client.get(`/rooms`, {
        params: {
            partnerId
        }
    });

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

export const getRoomForm = async ({ partnerId, roomId }) => {
    const res = await client.get(`/rooms/${roomId}`, {
        params: {
            partnerId,
        }
    });

    return res.data;
}

export const modifyRoom  = async ({ 
    number,
    name,
    colSeatCount,
    rowSeatCount,
    partnerId
}) => {
    const res = await client.put('/rooms', {
        number,
        name,
        colSeatCount,
        rowSeatCount,
        partnerId
    })

    return res.data;
}