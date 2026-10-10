import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
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

  const SectionTitle = ({ title }: { title: string }) => (
    <h3 className="mb-3 border-b pb-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
      {title}
    </h3>
  );

  const InfoItem = ({
    label,
    value,
  }: {
    label: string;
    value?: string | number | null;
  }) => (
    <div className="min-w-0 space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="wrap-break-words text-sm font-medium">
        {value !== null && value !== undefined && value !== ""
          ? value
          : "Not provided"}
      </p>
    </div>
  );

  return (
    <Sheet
      open={!!selectedId}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <SheetContent className="flex w-full p-2 flex-col gap-0 overflow-hidden sm:max-w-xl">
        <SheetHeader className="border-b pb-4">
          <SheetTitle>Review Doctor Application</SheetTitle>
          <SheetDescription>
            Review the doctor's information and documents before making your
            decision.
          </SheetDescription>
        </SheetHeader>

        {selectedDoctor ? (
          <>
            <div className="flex-1 space-y-6 overflow-y-auto py-5 pr-2">
              {/* Doctor Profile */}
              <section className="flex items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary">
                  {selectedDoctor.name?.charAt(0) || "D"}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="wrap-break-words text-lg font-semibold">
                    {selectedDoctor.name}
                  </h2>

                  <p className="mt-1 break-all text-sm text-muted-foreground">
                    {selectedDoctor.email}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      {selectedDoctor.verificationStatus}
                    </span>

                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      {selectedDoctor.specialization}
                    </span>
                  </div>
                </div>
              </section>

              {/* Basic Information */}
              <section>
                <SectionTitle title="Basic Information" />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoItem label="Full Name" value={selectedDoctor.name} />

                  <InfoItem
                    label="Email Address"
                    value={selectedDoctor.email}
                  />

                  <InfoItem
                    label="Contact Number"
                    value={selectedDoctor.contactNumber}
                  />

                  <InfoItem label="Address" value={selectedDoctor.address} />
                </div>
              </section>

              {/* Professional Information */}
              <section>
                <SectionTitle title="Professional Information" />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoItem
                    label="Specialization"
                    value={selectedDoctor.specialization}
                  />

                  <InfoItem
                    label="License Number"
                    value={selectedDoctor.licenseNumber}
                  />

                  <InfoItem
                    label="Qualifications"
                    value={selectedDoctor.qualifications}
                  />

                  <InfoItem
                    label="Experience"
                    value={
                      selectedDoctor.experienceYears !== null &&
                      selectedDoctor.experienceYears !== undefined
                        ? `${selectedDoctor.experienceYears} years`
                        : undefined
                    }
                  />

                  <InfoItem
                    label="Consultation Fee"
                    value={selectedDoctor.consultationFee}
                  />
                </div>
              </section>

              {/* Biography */}
              <section>
                <SectionTitle title="Professional Bio" />

                <p className="text-sm leading-6 text-muted-foreground">
                  {selectedDoctor.bio || "No biography provided."}
                </p>
              </section>

              {/* Documents */}
              <section>
                <SectionTitle title="Supporting Documents" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3 rounded-lg border p-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">Resume / CV</p>
                      <p className="text-xs text-muted-foreground">
                        Doctor's submitted resume
                      </p>
                    </div>

                    {selectedDoctor.resume ? (
                      <a
                        href={selectedDoctor.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-sm font-medium text-primary underline underline-offset-4"
                      >
                        View Resume
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Not provided
                      </span>
                    )}
                  </div>

                  {selectedDoctor.additionalFiles?.length ? (
                    selectedDoctor.additionalFiles.map((file, index) => (
                      <div
                        key={file.publicId || file.url}
                        className="flex items-center justify-between gap-3 rounded-lg border p-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium">
                            Supporting Document {index + 1}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {file.publicId}
                          </p>
                        </div>

                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-sm font-medium text-primary underline underline-offset-4"
                        >
                          View File
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No additional documents provided.
                    </p>
                  )}
                </div>
              </section>

              {/* Previous Review Details */}
              {(selectedDoctor.rejectionReason ||
                selectedDoctor.reviewedAt) && (
                <section>
                  <SectionTitle title="Previous Review Details" />

                  <div className="space-y-3">
                    {selectedDoctor.rejectionReason && (
                      <InfoItem
                        label="Rejection Reason"
                        value={selectedDoctor.rejectionReason}
                      />
                    )}

                    {selectedDoctor.reviewedAt && (
                      <InfoItem
                        label="Last Reviewed At"
                        value={new Date(
                          selectedDoctor.reviewedAt,
                        ).toLocaleString()}
                      />
                    )}
                  </div>
                </section>
              )}
            </div>

            {/* Actions */}
            <SheetFooter className="border-t pt-4">
              {confirmRejection ? (
                <div className="flex w-full flex-col gap-3">
                  <div>
                    <FieldLabel className="mb-2 block text-sm font-medium">
                      Rejection Reason
                    </FieldLabel>

                    <Textarea
                      placeholder="Explain why this application is being rejected..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleReviewAction("REJECTED")}
                      disabled={!rejectionReason.trim() || isPending}
                    >
                      {isPending ? <Spinner /> : "Confirm Rejection"}
                    </Button>

                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setConfirmRejection(false);
                        setRejectionReason("");
                      }}
                      disabled={isPending}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex w-full gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleReviewAction("APPROVED")}
                    disabled={isPending}
                  >
                    {isPending ? <Spinner /> : "Approve Application"}
                  </Button>

                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => setConfirmRejection(true)}
                    disabled={isPending}
                  >
                    Reject Application
                  </Button>
                </div>
              )}
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Doctor information not found.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default DoctorApprovalSheet;
