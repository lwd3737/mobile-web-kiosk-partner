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

export const deleteUseticketCategory = async ({ partnerId, id }) => {
  const res = await client.delete(`usetickets/categories/${id}`, {
    data: {
      partnerId,
    },
  });

  return res.data;
};

export const getUseticketDefinitions = async ({ partnerId }) => {
  const res = await client.get("usetickets/definitions", {
    params: {
      partnerId,
    },
  });

  return res.data;
};

export const createUseticketDefinition = async ({ partnerId, inputs }) => {
  const res = await client.post("/usetickets/definitions", {
    partnerId,
    inputs,
  });

  return res.data;
};

export const modifyUseticketDefinition = async ({
  partnerId,
  definitionId,
  inputs,
}) => {
  const res = await client.put(`/usetickets/${definitionId}`, {
    partnerId,
    inputs,
  });
  return res.data;
};
