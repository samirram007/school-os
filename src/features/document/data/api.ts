import axiosClient from "#/utils/axios-client"
import { getData, postData, putData } from "@/utils/dataClient"


const API_PATH = "/documents"
export async function fetchDocumentService(params?: any) {
    if (!params) {
        return await getData(API_PATH + `/root`)
    }
    return await getData(API_PATH)
}
export async function storeDocumentService(payload: FormData) {

    return await axiosClient.post(API_PATH, payload)
}
export async function updateDocumentService(payload: any) {
    return await putData(`${API_PATH}/${payload.id}`, payload)
}
export async function renameDocumentService(payload: { id: number, name: string }) {
    return await putData(`${API_PATH}/${payload.id}/rename`, { name: payload.name })
}