import axiosClient from "#/utils/axios-client"
import { getData, postData, putData } from "@/utils/dataClient"


const API_PATH = "/documents"
export async function fetchDocumentService(params?: any) {
    console.log("Fetching:", params);
    if (!params?.id) {
        return await getData(API_PATH + `/root`)
    }
    console.log("child called:", API_PATH + `/${params.id}/children`);

    return await getData(API_PATH + `/${params.id}/children`)
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
export async function moveDocumentService(payload: { id: number, parentId: number }) {
    // console.log("payload", payload);
    return await putData(`${API_PATH}/${payload.id}/move`, { parentId: payload.parentId })
}
export async function createFolderService(payload: { name: string, parentId: number | null }) {
    return await postData(`${API_PATH}/folder`, payload)
}