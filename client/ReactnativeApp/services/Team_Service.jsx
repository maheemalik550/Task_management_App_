import { apiHandle } from "../config/ApiHandle"



export const createTeamService = (data) => {

    return apiHandle.post('/team',data)
 }

 export const getTeamService = () => {

    return apiHandle.get('/')
 }

