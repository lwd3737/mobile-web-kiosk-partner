import client from '../client';

export const createSeats = async ({ partnerId, roomId, seats }) => {
    const res = await client.post(`/rooms/${roomId}/seats`, {
        partnerId,
        seats
    });
    return res.data;
}