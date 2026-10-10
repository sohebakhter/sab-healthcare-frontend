"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense, useState } from "react";
import { ScheduleParams, ScheduleStatus } from "@/types";
import DoctorScheduleTableLoading from "./schedule-list-loading";
import ScheduleTable from "./schedule-table";
import ScheduleCreateDialog from "./schedule-create-dialog";

const verificationStatus: ["ALL" | ScheduleStatus, string][] = [
  ["PUBLISHED", "Published"],
  ["DRAFT", "Draft"],
  ["ALL", "All"],
];

const ScheduleList = () => {
  const [tab, setTab] = useState<"ALL" | ScheduleStatus>("ALL");

  const queryParams: ScheduleParams = {
    ...(tab === "ALL" ? {} : { verificationStatus: tab }),
    page: 1,
    limit: 10,
    sortOrder: "asc",
    sortBy: "startDateTime",
  };
  return (
    <div>
      <div className="flex justify-between items-center my-3">
        <Tabs value={tab} onValueChange={(value) => setTab(value)}>
          <TabsList>
            {verificationStatus.map(([value, lable]) => (
              <TabsTrigger key={value} value={value}>
                {lable}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <ScheduleCreateDialog></ScheduleCreateDialog>
      </div>
      <Suspense fallback={<DoctorScheduleTableLoading />}>
        <ScheduleTable {...queryParams} />
      </Suspense>
    </div>
  );
};

export default ScheduleList;
