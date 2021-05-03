import { client } from "../client";

//partnerId는 임시적으로 보낸다. 인증 부분을 개발하면 쿠키로 보내기 때문에 나중에는 필요 x

export const getRoomList = async (partnerId) => {
  const res = await client.get(`/rooms`, {
    params: {
      partnerId,
    },
  });

  return res.data;
};

export const createRoom = async ({
  number,
  name,
  colSeatCount,
  rowSeatCount,
  partnerId,
}) => {
  const res = await client.post("/rooms", {
    number,
    name,
    colSeatCount,
    rowSeatCount,
    partnerId,
  });

  return res.data;
};

export const getRoom = async ({ partnerId, roomId }) => {
  const res = await client.get(`/rooms/${roomId}`, {
    params: {
      partnerId,
    },
  });

  return res.data;
};

export const modifyRoom = async ({
  id,
  number,
  name,
  colSeatCount,
  rowSeatCount,
  partnerId,
}) => {
  const res = await client.put(`/rooms/${id}`, {
    id,
    number,
    name,
    colSeatCount,
    rowSeatCount,
    partnerId,
  });

  return res.data;
};

export const deleteRoom = async ({ id, partnerId }) => {
  const res = await client.delete(`rooms/${id}`, {
    data: {
      partnerId,
    },
  });

  return res.data;
};
