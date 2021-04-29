import client from "../client";

export const createUseticketCatetory = async ({ partnerId, name }) => {
  const res = await client.post("usetickets/category", {
    partnerId,
    name,
  });

  return res.data;
};

export const createUseticketDefinition = async ({ partnerId, inputs }) => {
  const res = await client.post("/usetickets/definition", {
    partnerId,
    inputs,
  });

  return res.data;
};
