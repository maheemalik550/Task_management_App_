import { apiHandle } from "../config/ApiHandle"

export const create_Project_service = (data) => {

    return apiHandle.post('/Project',data)
 }

 export const get_Project_service = () => {

    return apiHandle.get('/getProject')
 }
