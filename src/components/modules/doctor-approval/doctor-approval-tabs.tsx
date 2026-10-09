"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";
import { Suspense, useState } from "react";
import DoctorApprovalTableLoading from "./doctor-approval-table-loading";
import { DoctorParams, DoctorVerificationStatus } from "@/types";
import { Input } from "@/components/ui/input";
import DoctorApprovalSheet from "./doctor-approval-sheet";
import { useDebounce } from "@/hooks";

const verificationStatus: ["ALL" | DoctorVerificationStatus, string][] = [
  ["APPROVED", "Approved"],
  ["PENDING", "Pending"],
  ["REJECTED", "Rejected"],
  ["ALL", "All"],
];

const DoctorApprovalTabs = () => {
  const [tab, setTab] = useState<"ALL" | DoctorVerificationStatus>("ALL");
  const [selectedId, setSelectedId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchInput);

  const queryParams: DoctorParams = {
    ...(tab === "ALL" ? {} : { verificationStatus: tab }),
    page: page,
    limit: 10,
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };
  return (
    <div>
      <div className="flex justify-between items-center my-3">
        <div>
          <Input
            onChange={(e) => setSearchInput(e.target.value)}
            type="search"
            placeholder="Search by name or email"
          ></Input>
        </div>
        <Tabs value={tab} onValueChange={(value) => setTab(value)}>
          <TabsList>
            {verificationStatus.map(([value, lable]) => (
              <TabsTrigger key={value} value={value}>
                {lable}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <Suspense fallback={<DoctorApprovalTableLoading />}>
        <DoctorApprovalTable
          {...queryParams}
          handleReview={setSelectedId}
          setPage={setPage}
        />
      </Suspense>

      <DoctorApprovalSheet
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
        {...queryParams}
      />
    </div>
  );
};

export default DoctorApprovalTabs;
