"use client";
import { useMyAppointments } from "@/hooks";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

const AppointmentList = () => {
  const params = useSearchParams();
  const status = params.get("status");
  const { data } = useMyAppointments({ page: 1, limit: 100 });

  const appointments = data?.data?.data || [];

  if (status === "success") {
    return (
      <div>
        <h1>PAYMENT SUCCESSFUL</h1>
        <p>Please be prepared to join the video call</p>
        <Button variant="outline">
          <Link href="/dashboard/my-appointments">Go Back to Appointments</Link>
        </Button>
      </div>
    );
  }
  if (status === "failure") {
    return (
      <div>
        <h1>PAYMENT FAILURE</h1>
        <p>Please check your vendor</p>
        <Button variant="outline">
          <Link href="/dashboard/my-appointments">Go Back to Appointments</Link>
        </Button>
      </div>
    );
  }

  if (appointments.length === 0) {
    return <p>There is no Appointments</p>;
  }
  return (
    <div>
      {appointments.map(({ doctor, status, id }) => (
        <div key={id} className="border rounded-md p-3">
          <div className="w-full flex gap-3">
            <span>Doctor: {doctor.name}</span>
            <span>Status: {status}</span>
            <div className="ml-auto">
              <Button>Join</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
