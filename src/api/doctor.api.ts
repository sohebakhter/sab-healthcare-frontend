import { apiClient } from "@/lib/apiClient"
import { DoctorApplicationPayload, IVerifyAccountPayload } from "@/types"

export const applyAsDoctor = (payload: DoctorApplicationPayload) => {
    const formData = new FormData()

    formData.append("data", JSON.stringify(payload.data))

    formData.append("resume", payload.resume)

    for (const file of payload.additionalFiles) {
        formData.append("additionalFiles", file)
    }

    return apiClient("/doctor/apply-as-doctor", { method: "POST", body: formData })
}
export const verifyDoctorAccount = (payload: IVerifyAccountPayload) => {

    return apiClient("/doctor/apply-as-doctor/verify-email", { method: "POST", body: payload })
}