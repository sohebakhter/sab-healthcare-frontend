import {
  applyAsDoctor,
  approveDoctor,
  getAllDoctors,
  getAllPublicDoctors,
  getPublicDoctorProfile,
  getTodayScheduleByDoctor,
  verifyDoctorAccount,
} from "@/api";
import { DoctorParams, PublicDoctorParams } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const useApplyAsDoctor = () => {
  return useMutation({
    mutationFn: applyAsDoctor,
  });
};
export const useVerifyDoctorAccount = () => {
  return useMutation({
    mutationFn: verifyDoctorAccount,
  });
};
export const useGetAllDocotors = (params: DoctorParams) => {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: () => getAllDoctors(params),
  });
};
export const useGetPublicDoctors = (params: PublicDoctorParams) => {
  return useQuery({
    queryKey: ["public-doctors", params],
    queryFn: () => getAllPublicDoctors(params),
  });
};
export const usePublicDoctorProfile = (doctorId: string) => {
  return useQuery({
    queryKey: ["public-doctor-profile", doctorId],
    queryFn: () => getPublicDoctorProfile(doctorId),
  });
};
export const useSuspenseGetPublicDoctors = (params: PublicDoctorParams) => {
  return useSuspenseQuery({
    queryKey: ["public-doctors", params],
    queryFn: () => getAllPublicDoctors(params),
  });
};
export const useSuspenseGetAllDocotors = (params: DoctorParams) => {
  return useSuspenseQuery({
    queryKey: ["doctors", params],
    queryFn: () => getAllDoctors(params),
  });
};

export const useApproveDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};

export const useGetTodayScheduleByDoctor = (params: {
  doctorId?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["schedule", params],
    queryFn: () => getTodayScheduleByDoctor(params),
  });
};
