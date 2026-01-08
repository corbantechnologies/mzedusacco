"use client";

import { apiActions } from "@/tools/axios";

export const createLoanAccount = async (values, token) => {
  const response = await apiActions?.post("/api/v1/loanaccounts/", values, token);
  return response?.data;
};

export const getLoans = async (token) => {
  const response = await apiActions?.get("/api/v1/loanaccounts/", token);
  return response?.data?.results;
};

export const getLoan = async (identity, token) => {
  const response = await apiActions?.get(`/api/v1/loanaccounts/${identity}/`, token);
  return response?.data;
};

// Admin creates a loan for a member
export const adminCreateLoanForMember = async (values, token) => {
  const response = await apiActions?.post(
    `/api/v1/loanaccounts/create/loan/`,
    values,
    token
  );
  return response?.data;
};
