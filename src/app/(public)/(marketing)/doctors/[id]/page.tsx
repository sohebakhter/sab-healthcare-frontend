import { MapPin, Phone, Clock, GraduationCap } from "lucide-react";
import { getAllPublicDoctors, getPublicDoctorProfile } from "@/api";
import DoctorBooking from "@/components/modules/doctors/doctor-booking";

export async function generateStaticParams() {
  const limit = 100;
  const first = await getAllPublicDoctors({ page: 1, limit });
  const all = [...first.data];

  for (let page = 2; page <= (first.meta.totalPages ?? 1); page++) {
    const next = await getAllPublicDoctors({ page, limit });
    all.push(...next.data);
  }

  return all.map((doctor) => ({ id: doctor.id }));
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const response = await getPublicDoctorProfile(id);
  const doctor = response?.data;

  if (!doctor) {
    return <p className="py-10 text-center">Doctor not found.</p>;
  }

  return (
    <main className="min-h-screen bg-blue-50/70 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-4">
            {doctor.user?.imageUrl ? (
              <img
                src={doctor.user.imageUrl}
                alt={doctor.name}
                className="size-20 shrink-0 rounded-xl border border-blue-100 object-cover"
              />
            ) : (
              <div className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-2xl font-bold text-blue-700">
                {doctor.name.charAt(0)}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <span className="text-xs font-medium text-blue-600">
                {doctor.specialization}
              </span>
              <h1 className="mt-1 text-lg font-bold text-slate-800">
                {doctor.name}
              </h1>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                <GraduationCap className="size-4 shrink-0" />
                {doctor.qualifications || "Qualifications unavailable"}
              </p>
            </div>
          </div>

          <div className="my-5 h-px bg-blue-100" />

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-blue-50 p-3">
              <p className="text-xs text-slate-500">Experience</p>
              <p className="mt-1 font-semibold text-slate-800">
                {doctor.experienceYears ?? 0} years
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3">
              <p className="text-xs text-slate-500">Consultation Fee</p>
              <p className="mt-1 font-semibold text-blue-700">
                {doctor.consultationFee ?? "N/A"}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-blue-500" />
              {doctor.address || "Address unavailable"}
            </p>

            <p className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-blue-500" />
              {doctor.contactNumber || "Contact unavailable"}
            </p>

            <p className="flex items-start gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-blue-500" />
              {doctor.bio || "No biography available."}
            </p>
          </div>

          <DoctorBooking doctorId={doctor.id} />
        </div>
      </div>
    </main>
  );
};

export default Page;
