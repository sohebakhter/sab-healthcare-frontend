export interface IRegistrationPayload {
    name: string
    email: string
    password: string
    patient: {
        contactNumber?: string
    }
}