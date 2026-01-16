"use client";

export const getMemberSummary = async (memberNo, token) => {
  const response = await axios.get(
    `/api/v1/transactions/summary/yearly/${memberNo}`,
    token
  );
  return response.data;
};
