import { apiClient } from "@/lib/apiClient";
import {
  ApiResponse,
  BookAppointmentPayload,
  BookAppointmentResponse,
  PublicDoctorProfile,
} from "@/types";

export const bookAppointment = (payload: BookAppointmentPayload) => {
  return apiClient<ApiResponse<BookAppointmentResponse>>(
    "/appointment/book-appointment",
    {
      method: "POST",
      body: payload,
    },
  );
};
export const myAppointments = (params: { page: number; limit: number }) => {
  return apiClient<
    ApiResponse<{ doctor: PublicDoctorProfile; status: string; id: string }[]>
  >("/appointment/my-appointments", {
    params,
  });
};
