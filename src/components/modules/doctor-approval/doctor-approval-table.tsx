"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseGetAllDocotors } from "@/hooks";
import { DoctorParams } from "@/types";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import TablePagination from "@/components/ui/table-pagination";

interface IProps extends DoctorParams {
  handleReview: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
}

const DoctorApprovalTable = ({ handleReview, setPage, ...params }: IProps) => {
  const { data } = useSuspenseGetAllDocotors(params);

  const doctors = data?.data;

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Qualifications</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>LicenseNumber</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.qualifications}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>{doctor.licenseNumber}</TableCell>
                <TableCell>{doctor.verificationStatus}</TableCell>
                <TableCell className="text-right">
                  {doctor.user.emailVerified ? (
                    <Button
                      onClick={() => handleReview(doctor.id)}
                      disabled={doctor.verificationStatus !== "PENDING"}
                    >
                      {doctor.verificationStatus !== "PENDING"
                        ? "Reviewed"
                        : "Review"}
                    </Button>
                  ) : (
                    <Button disabled variant="outline">
                      Not Verified
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="my-5">
        <TablePagination
          totalPages={data.meta.totalPages ?? 0}
          setPage={setPage}
          page={params.page ?? 0}
        />
      </div>
    </>
  );
};

export default DoctorApprovalTable;
