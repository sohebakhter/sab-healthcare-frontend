import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  // SheetTrigger,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useApproveDoctor, useGetAllDocotors } from "@/hooks";
import { useState } from "react";

interface IProps {
  selectedId: string;
  onClose: () => void;
}

const DoctorApprovalSheet = ({ selectedId, onClose, ...params }: IProps) => {
  const [confirmRejection, setConfirmRejection] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data } = useGetAllDocotors(params);
  const { mutate: verify, isPending } = useApproveDoctor();

  const selectedDoctor = data?.data.find((doctor) => doctor.id === selectedId);

  const handleClose = () => {
    setConfirmRejection(false);
    setRejectionReason("");
    onClose();
  };

  const handleReviewAction = (status: "APPROVED" | "REJECTED") => {
    const reviewData = {
      doctorId: selectedId,
      verificationStatus: status,
      rejectionReason: rejectionReason,
    };

    verify(reviewData, {
      onSuccess: (res) => {
        console.log("success", res);

        handleClose();
      },
      onError: (err) => {
        console.log("Error", err);
      },
    });
  };

  return (
    <Sheet open={!!selectedId} onOpenChange={handleClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Review and take action</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
        </SheetHeader>
        Doctor Name: {selectedDoctor?.name}
        <SheetFooter>
          {confirmRejection ? (
            <div className="flex flex-col gap-2">
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleReviewAction("REJECTED")}
                  disabled={!rejectionReason || isPending}
                >
                  {isPending ? <Spinner /> : "Confirm Rejection"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => handleReviewAction("APPROVED")}
                disabled={isPending}
              >
                {isPending ? <Spinner /> : "Approve"}
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => setConfirmRejection(true)}
              >
                Reject
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DoctorApprovalSheet;
