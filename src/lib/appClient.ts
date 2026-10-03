import { ofetch } from "ofetch";

 const BASE_URL= process.env.NEXT_PUBLIC_API_BASE_URL

export const appClient = ofetch.create({
    baseURL: BASE_URL,
})