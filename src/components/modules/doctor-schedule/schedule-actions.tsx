import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useDeleteSchedule, usePublishSchedule } from "@/hooks";
import { Schedule } from "@/types";
import { useState } from "react";
import ScheduleDetailSheet from "./schedule-detail-sheet";

const ScheduleActions = ({ schedule }: { schedule: Schedule }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { mutate: publishSchedule, isPending: isPublishing } =
    usePublishSchedule();
  const { mutate: deleteSchedule, isPending: isDeleting } = useDeleteSchedule();

  const locked = schedule.status === "PUBLISHED";

  const handlePublish = () => {
    publishSchedule(schedule.id, {
      onSuccess: () => {
        console.log("Schedule published successfully");
        toast.add({
          title: "Success",
          description: "Schedule published successfully",
          type: "success",
        });
      },
      onError: (error) => {
        console.error("Error publishing schedule:", error);
        toast.add({
          title: "Error",
          description: "Failed to publish schedule",
          type: "error",
        });
      },
    });
  };

  const handleDelete = () => {
    deleteSchedule(schedule.id, {
      onSuccess: () => {
        console.log("Schedule deleted successfully");
        toast.add({
          title: "Success",
          description: "Schedule deleted successfully",
          type: "success",
        });
      },
      onError: (error) => {
        console.error("Error deleting schedule:", error);
        toast.add({
          title: "Error",
          description: "Failed to delete schedule",
          type: "error",
        });
      },
    });
  };

  if (confirmDelete) {
    return (
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => setConfirmDelete(false)}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Confirming..." : "Confirm"}
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setDetailOpen(true)}>
          View
        </Button>
        {schedule.status === "DRAFT" && (
          <Button
            variant="default"
            size="sm"
            onClick={handlePublish}
            disabled={locked || isPublishing}
          >
            Publish
          </Button>
        )}
        {!locked && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </Button>
        )}
      </div>
      <ScheduleDetailSheet
        schedule={schedule}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </>
  );
};

export default ScheduleActions;
