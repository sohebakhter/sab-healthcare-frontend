import z from "zod"

export const MAX_FILE_SIZE = 5
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024

export const MAX_ADDITIONAL_FILES = 5

const SUPPORTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/png", "image/jpeg"]

export const isAcceptedFileSize = (fileSize: number) => {
    return fileSize <= MAX_FILE_SIZE_BYTES
}
export const isAcceptedFileType = (fileType: string) => {
    return SUPPORTED_FILE_TYPES.includes(fileType)
}

const getCustomFileSchema = <T>(message: string) => {
    return (
        z.custom<T>((value) => value === null ||
            (value instanceof File && isAcceptedFileSize(value.size) && isAcceptedFileType(value.type)),
            {
                message: message
            })
    )
}

export const doctorApplicationSchema = z.object({
    name: z.string().trim().min(2, "Full name must be at least 2 character long"),
    email: z.email("Please inter a valid email address"),
    phone: z.string().trim().min(5, "Contact Number is invalid"),
    address: z.string(),
    specialization: z.string().trim().min(2, "specialization is requried"),
    licenseNumber: z.string().trim().min(3, "licenseNumber is requried"),
    qualifications: z.string().trim().min(2, "qualifications are requried"),
    experienceYears: z.string().trim().refine((value) => /^\d+$/.test(value), {
        message: "Years of experience must be a whole value"
    }).refine((value) => Number(value) >= 0 && Number(value) <= 60, {
        message: "Years of experience must be between 0 and 60"
    }),
    consultationFee: z.string().trim().refine((value) => value === "" || (/^\d+$/.test(value) && Number(value) >= 0), {
        message: "consultation fee must be a non-zero whole number"
    }),
    bio: z.string().trim().max(1000, "bio cannot exceed 1000 characters"),
    resume: getCustomFileSchema<File | null>(`Resume must be a PDF, DOC, DOCX or an image file under ${MAX_FILE_SIZE}MB`)
        .refine((value) => value instanceof File, {
            message: "A resume or cv is required"
        }),
    additionalFiles: z.array(z.custom<File>((value) => value instanceof File))
        .max(MAX_ADDITIONAL_FILES, `You can attach at most ${MAX_ADDITIONAL_FILES} supporting documents`)
        .refine((files) => files.every((file) => isAcceptedFileSize(file.size) && isAcceptedFileType(file.type)), {
            message: `Each file must be a PDF, DOC, DOCX or an image file under ${MAX_FILE_SIZE}MB`
        })
})