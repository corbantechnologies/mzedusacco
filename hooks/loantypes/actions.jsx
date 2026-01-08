"use client";

import { getLoanProductDetail, getLoanProducts } from "@/services/loanproducts";
import useAxiosAuth from "../authentication/useAxiosAuth";
import { useQuery } from "@tanstack/react-query";

export function useFetchLoanTypes() {
  const token = useAxiosAuth();

  return useQuery({
    queryKey: ["loanTypes"],
    queryFn: () => getLoanProducts(token),
  });
}

export function useFetchLoanTypeDetail(reference) {
  const token = useAxiosAuth();

  return useQuery({
    queryKey: ["loanType", reference],
    queryFn: () => getLoanProductDetail(reference, token),
  });
}
