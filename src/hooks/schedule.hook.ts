import {
  createSchedule,
  deleteSchedule,
  getMySchedules,
  publishSchedule,
} from "@/api";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
};
export const useMySchedules = (params: any) => {
  return useQuery({
    queryKey: ["schedules", params],
    queryFn: () => getMySchedules(params),
  });
};
export const useSuspenseMySchedules = (params: any) => {
  return useSuspenseQuery({
    queryKey: ["schedules", params],
    queryFn: () => getMySchedules(params),
  });
};

export const usePublishSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: publishSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
};
export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
};
