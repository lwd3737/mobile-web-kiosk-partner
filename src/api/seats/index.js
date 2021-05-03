import { client } from "../client";

export const getSeats = async ({ partnerId, roomId }) => {
  const res = await client.get(`/rooms/${roomId}/seats?partnerId=${partnerId}`);
  return res.data;
};

export const createSeats = async ({ partnerId, roomId, seats }) => {
  const res = await client.post(`/rooms/${roomId}/seats`, {
    partnerId,
    seats,
  });
  return res.data;
};

export const modifySeats = async ({ partnerId, roomId, seats }) => {
  const res = await client.put(`/rooms/${roomId}/seats`, {
    partnerId,
    seats,
  });
  return res.data;
};
