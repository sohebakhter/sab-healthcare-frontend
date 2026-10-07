import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";

const DoctorApprovalTabs = () => {
  return (
    <Tabs defaultValue="Pending" >
      <TabsList>
        <TabsTrigger value="Pending">Pending</TabsTrigger>
        <TabsTrigger value="Approved">Approved</TabsTrigger>
        <TabsTrigger value="Rejected">Rejected</TabsTrigger>
        <TabsTrigger value="All">All</TabsTrigger>
      </TabsList>
      <TabsContent value="Pending">
        <DoctorApprovalTable />
      </TabsContent>
      <TabsContent value="Approved">
        <DoctorApprovalTable />
      </TabsContent>
      <TabsContent value="Rejected">
        <DoctorApprovalTable />
      </TabsContent>
      <TabsContent value="All">
        <DoctorApprovalTable />
      </TabsContent>
    </Tabs>
  );
};

export default DoctorApprovalTabs;
