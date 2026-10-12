import { PublicDoctorList } from "@/components/modules/doctors/doctor-list";

const DoctorsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Doctors</h1>
        <p className="text-lg text-gray-600 mb-8">
          Find and connect with our network of qualified healthcare
          professionals.
        </p>
      </div>
      <PublicDoctorList />
    </div>
  );
};

export default DoctorsPage;
