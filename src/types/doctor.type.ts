import { User } from "./user.type";

export interface DoctorApplicationData {
  user: {
    name: string;
    email: string;
  };
  doctor: {
    specialization: string;
    licenseNumber: string;
    qualifications: string;
    experienceYears: number;
    contactNumber: string;
    address: string;
    consultationFee?: number;
    bio: string;
  };
}
export interface DoctorApplicationPayload {
  resume: File;
  additionalFiles: File[];
  data: DoctorApplicationData;
}

export type DoctorVerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Doctor {
  id: string;
  name: string;
  email: string;
  address?: null | string;
  specialization: string;
  licenseNumber: string;
  qualifications: string;
  experienceYears: number;
  bio?: null | string;
  consultationFee: string;
  contactNumber?: null | string;
  verificationStatus: DoctorVerificationStatus;
  rejectionReason?: null | string;
  reviewedBy?: null | string;
  reviewedAt?: null | string;
  resume?: null | string;
  resumePublicId?: null | string;
  additionalFiles?: { url: string; publicId: string }[] | null;
  isDeleted: boolean;
  deletedAt?: null | string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
}

export interface DoctorParams {
  verificationStatus?: DoctorVerificationStatus;
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortOrder?: "desc" | "asc";
}

export interface ApproveDoctorPayload {
  doctorId: string;
  verificationStatus: "APPROVED" | "REJECTED";
  rejectionReason?: string;
}
