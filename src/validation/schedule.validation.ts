import z from "zod";
const MINIMUM_SLOT_MINUTES = 20;
const GOOGLE_MEET_LINK_REGEX = /^https:\/\/meet\.google\.com\/[a-zA-Z0-9-]+$/;

function slotMinutesValidation(startTime: string, endTime: string) {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  return endTotalMinutes - startTotalMinutes;
}

export const scheduleSchema = z
  .object({
    date: z.string().min(1, "Date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    meetingLink: z
      .string()
      .trim()
      .min(1, "Meeting link is required")
      .regex(
        GOOGLE_MEET_LINK_REGEX,
        "Invalid Google Meet link (e.g., https://meet.google.com/abc-defg-hij)",
      ),
  })
  .refine(
    (value) => {
      const { startTime, endTime } = value;
      return startTime < endTime;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    },
  )
  .refine(
    (value) =>
      slotMinutesValidation(value.startTime, value.endTime) >=
      MINIMUM_SLOT_MINUTES,
    {
      message: `Time slot must be at least ${MINIMUM_SLOT_MINUTES} minutes long`,
      path: ["endTime"],
    },
  );
