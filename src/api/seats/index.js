import client from './client';

export const createRooms = async ({ partnerId, roomId, seats }) => {
    const res = await client.post(`/partner/rooms/${roomId}/seats`, {
        partnerId,
        seats
    });
    return res.data;
}