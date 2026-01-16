"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";
import {
  getGuarantorProfiles,
  getGuarantorProfile,
} from "@/services/guarantorprofiles";

export function useFetchGuarantorProfiles() {
  const token = useAxiosAuth();

  return useQuery({
    queryKey: ["guarantor-profiles"],
    queryFn: () => getGuarantorProfiles(token),
    enabled: !!token,
  });
}

export function useFetchGuarantorProfile(reference) {
  const token = useAxiosAuth();

  return useQuery({
    queryKey: ["guarantor-profile", reference],
    queryFn: () => getGuarantorProfile(reference, token),
    enabled: !!token && !!reference,
  });
}
