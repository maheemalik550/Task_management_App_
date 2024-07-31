import { apiHandle } from "../config/ApiHandle"


export const signup_service = (post_data) => {

   return apiHandle.post('/Signup', post_data)
}


export const login_service = (post_data) => {

   return apiHandle.post('/Login', post_data)
}




export const check_auth_service = () => {

   return apiHandle.get('/auth')
}

export const updateProfileImage = (data) => {

   return apiHandle.post('/update',data)
}

export const updateProfileData = (data) => {

   return apiHandle.post('/updateprofile',data)
}
export const get_all_user = () => {

   return apiHandle.get('/users')
}

// export const get_user = () => {

//    return apiHandle.get('/teamUser')
// }