import { apiClient } from "@/lib/apiClient"
import { IRegistrationPayload } from "@/types"

export const userLogin = (payload: { email: string, password: string }) => {
    return apiClient("/auth/login", { method: "POST", body: payload })
}
export const userLogout = () => {
    return apiClient("/auth/logout", { method: "POST" })
}
export const userRegistration = (payload: IRegistrationPayload) => {
    return apiClient("/auth/register", { method: "POST", body: payload })
}

export const googleOAuth = (payload: { idToken: string }) => {
    return apiClient("/auth/google", { method: "POST", body: payload })
}

export const getMe = () => {
    return apiClient("/auth/me")
}