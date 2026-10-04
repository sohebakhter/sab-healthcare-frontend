import z from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(100, { message: "Password cannot exceed 100 characters" })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter",
        })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter",
        })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Atleast one Special Charecter." }),
});

export const patientRegistrationSchema = z.object({
    name: z.string("Not a String!!").min(3, "Name must be at least 3 character long"),
    email: z.email("Not Email!!"),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(100, { message: "Password cannot exceed 100 characters" })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter",
        })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter",
        })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Atleast one Special Charecter." }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
    contactNumber: z
        .string()
        .refine((val) => val === "" || /^(?:\+?880|0)1[3-9]\d{8}$/.test(val),
            {
                message: "Please provide a valid Bangladeshi mobile number",
            }
        )
        .optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password not matched",
    path: ["confirmPassword"]
});