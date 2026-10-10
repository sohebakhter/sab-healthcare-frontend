const prefix = "/doctor";
export const doctorRoutes = [
  {
    title: "Schedule",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Create Shedule",
        url: `${prefix}/schedules`,
      },
    ],
  },
  {
    title: "App Settings",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
      },
    ],
  },
];
