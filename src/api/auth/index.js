import { client } from "../client";

export const login = async (ownerId) => {
  const res = await client.post("login", {
    ownerId,
  });

  return res.data;
};
