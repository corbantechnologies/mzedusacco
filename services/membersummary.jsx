"use client";

import { apiActions } from "@/tools/axios";

export const getMemberSummary = async (memberNo, token) => {
  const response = await apiActions?.get(
    `/api/v1/transactions/summary/yearly/${memberNo}`,
    token
  );
  return response.data;
};
