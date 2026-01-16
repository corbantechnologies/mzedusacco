"use client";

import { apiActions } from "@/tools/axios";

export const createGuaranteeRequest = async (values, token) => {
  // guarantor
  // loan_application
  // guaranteed_amount
  await apiActions?.post("/api/v1/guaranteerequests/", values, token);
};

export const getGuaranteeRequests = async (token) => {
  await apiActions?.get("/api/v1/guaranteerequests/", token);
};

export const getGuaranteeRequest = async (id, token) => {
  await apiActions?.get(`api/v1/guaranteerequests/${id}/`, token);
};

export const updateGuaranteeRequest = async (reference, values, token) => {
  // update status 3 options:
  // 1. Declined
  // 2. Accepted (without changing the requested amount)
  // 3. Accepted (with changing the requested amount)
  // Values: status, guaranteed_amount
  await apiActions?.put(
    `api/v1/guaranteerequests/${reference}/status/`,
    values,
    token
  );
};
