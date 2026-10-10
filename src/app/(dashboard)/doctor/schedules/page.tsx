import ScheduleList from "@/components/modules/doctor-schedule/schedule-list";

const SchedulesPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl">My Schedules</h1>
      <p>Create schedules, published them for bookings or delete drafts.</p>

      <ScheduleList />
    </div>
  );
};

export default SchedulesPage;
