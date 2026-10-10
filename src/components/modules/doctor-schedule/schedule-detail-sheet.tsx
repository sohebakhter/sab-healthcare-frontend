import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Schedule } from "@/types";

interface IProps {
  schedule: Schedule;
  open: boolean;
  onClose: () => void;
}

const ScheduleDetailSheet = ({ schedule, open, onClose }: IProps) => {
  const startDate = new Date(schedule.startDateTime);
  const endDate = new Date(schedule.endDateTime);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const formatDateTime = (date: Date) =>
    date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const InfoItem = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="wrap-break-words text-sm font-medium">{value}</p>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Schedule Details</SheetTitle>
          <SheetDescription>
            {startDate.toLocaleDateString(undefined, {
              dateStyle: "full",
            })}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-4 pb-6">
          {/* Status */}
          <section className="rounded-lg border p-4">
            <p className="mb-2 text-sm text-muted-foreground">
              Schedule Status
            </p>
            <span className="inline-flex rounded-full bg-muted px-3 py-1 text-sm font-medium">
              {schedule.status}
            </span>
          </section>

          {/* Date & Time */}
          <section className="space-y-4">
            <h3 className="border-b pb-2 text-sm font-semibold">Date & Time</h3>

            <InfoItem
              label="Date"
              value={startDate.toLocaleDateString(undefined, {
                dateStyle: "long",
              })}
            />

            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Start Time" value={formatTime(startDate)} />

              <InfoItem label="End Time" value={formatTime(endDate)} />
            </div>

            <InfoItem
              label="Start Date & Time"
              value={formatDateTime(startDate)}
            />

            <InfoItem label="End Date & Time" value={formatDateTime(endDate)} />
          </section>

          {/* Slots */}
          <section className="space-y-4">
            <h3 className="border-b pb-2 text-sm font-semibold">
              Slot Information
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Total Slots</p>
                <p className="mt-1 text-2xl font-semibold">
                  {schedule.totalSlots}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Available Slots</p>
                <p className="mt-1 text-2xl font-semibold">
                  {schedule.availableSlots}
                </p>
              </div>
            </div>

            <InfoItem
              label="Booked Slots"
              value={schedule.totalSlots - schedule.availableSlots}
            />

            {/* <InfoItem
              label="Total Appointments"
              value={schedule.appointments.length}
            /> */}
          </section>

          {/* Meeting Link */}
          <section className="space-y-3">
            <h3 className="border-b pb-2 text-sm font-semibold">
              Meeting Information
            </h3>

            {schedule.meetingLink ? (
              <div className="space-y-2">
                <InfoItem label="Meeting Link" value={schedule.meetingLink} />

                <a
                  href={schedule.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-sm font-medium text-primary underline underline-offset-4"
                >
                  Open Google Meet
                </a>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No meeting link available.
              </p>
            )}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ScheduleDetailSheet;
