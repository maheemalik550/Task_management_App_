import { apiHandle } from "../config/ApiHandle"


export const create_Task_service = () => {

    return apiHandle.post('/task')
 }


