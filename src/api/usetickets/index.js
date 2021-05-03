import axios, { client } from "../client";

export const getUseticketCategories = async ({ partnerId }) => {
  const res = await client.get("usetickets/categories", {
    params: {
      partnerId,
    },
  });
  return res.data;
};

export const createUseticketCatetory = async ({ partnerId, name }) => {
  const res = await client.post("usetickets/categories", {
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
