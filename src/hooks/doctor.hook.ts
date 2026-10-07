import { applyAsDoctor, verifyDoctorAccount } from "@/api"
import { useMutation } from "@tanstack/react-query"

export const useApplyAsDoctor = () => {
    return useMutation({
        mutationFn: applyAsDoctor
    })
}
export const useVerifyDoctorAccount = () => {
    return useMutation({
        mutationFn: verifyDoctorAccount
    })
}