import { getData, postData, putData } from "@/utils/dataClient";


const API_PATH = "/menus"

async function fetchMenuService() {

    return await getData(API_PATH)
}
async function storeMenuService(payload: any) {
    return await postData(API_PATH, payload)
}
async function updateMenuService(payload: any) {
    return await putData(`${API_PATH}/${payload.id}`, payload)
}
async function deleteMenuService(payload: any) {
    return await putData(`${API_PATH}/${payload.id}`, payload)
}

export { deleteMenuService, fetchMenuService, storeMenuService, updateMenuService };

