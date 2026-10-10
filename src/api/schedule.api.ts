import { apiClient } from "@/lib/apiClient";
import { ApiResponse, Schedule } from "@/types";

export const createSchedule = (payload: any) => {
  return apiClient("/schedule/create-schedule", {
    method: "POST",
    body: payload,
  });
};

export const getMySchedules = (params: any) => {
  return apiClient("/schedule/my-schedules", { params });
};

export const publishSchedule = (scheduleId: string) => {
  return apiClient<ApiResponse<Schedule>>(
    `/schedule/publish-schedule/${scheduleId}`,
    {
      method: "PATCH",
    },
  );
};
export const deleteSchedule = (scheduleId: string) => {
  return apiClient<ApiResponse<Schedule>>(`/schedule/${scheduleId}`, {
    method: "DELETE",
  });
};
