import { bookAppointment, myAppointments } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useBookAppointment = () => {
  return useMutation({
    mutationFn: bookAppointment,
  });
};
export const useMyAppointments = (params: { page: number; limit: number }) => {
  return useQuery({
    queryKey: ["appointment"],
    queryFn: () => myAppointments(params),
  });
};
