import { getData } from "@/utils/dataClient";

const API_PATH = "/tenants"
async function fetchTenantService() {

    return await getData(`${API_PATH}`)
}
export { fetchTenantService };