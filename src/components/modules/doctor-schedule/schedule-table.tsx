"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMySchedules } from "@/hooks";
import { Schedule, ScheduleParams } from "@/types";
import ScheduleActions from "./schedule-actions";

const formatDateTime = (value: string) => {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const ScheduleTable = (params: ScheduleParams) => {
  const { data } = useMySchedules(params);

  const schedules = data?.data?.data || [];

  if (schedules.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center text-sm text-muted-foreground">
        No schedules found
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Slots</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules?.map((schedule: Schedule) => (
            <TableRow key={schedule.id}>
              <TableCell>
                <div>{formatDateTime(schedule.startDateTime)}</div>
                <div>to {formatDateTime(schedule.endDateTime)}</div>
              </TableCell>
              <TableCell>
                {schedule.totalSlots - schedule.availableSlots}/
                {schedule.totalSlots} booked
              </TableCell>
              <TableCell>
                <span
                  className={
                    schedule.status === "PUBLISHED"
                      ? "text-green-600"
                      : "text-amber-600"
                  }
                >
                  {schedule.status}
                </span>
              </TableCell>

              <TableCell className="text-right">
                <ScheduleActions schedule={schedule} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScheduleTable;
