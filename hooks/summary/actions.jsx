"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";
import useUserMemberNo from "../authentication/useUserMemberNo";
import { getMemberSummary } from "@/services/membersummary";

export function useFetchMemberSummary() {
  const token = useAxiosAuth();
  const memberNo = useUserMemberNo();

  return useQuery({
    queryKey: ["memberSummary", memberNo, token],
    queryFn: () => getMemberSummary(memberNo, token),
  });
}
