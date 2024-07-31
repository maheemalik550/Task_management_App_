
import axios from "axios"

import AsyncStorage from "@react-native-async-storage/async-storage";
import { save_tokens_constant } from "../utils/constants";


const baseURL = 'https://app-backend-kappa.vercel.app/'


export const apiHandle = axios.create({
  baseURL,
  headers: {
    ...axios.defaults.headers,
    'Content-Type': 'application/json'
    
    
  },

})


axios.defaults.timeout = 15000;

apiHandle.interceptors.request.use(async req => {
  const auth_token = await AsyncStorage.getItem(save_tokens_constant)  || ''
  if (auth_token) {
    req.headers.Authorization = `Bearer ${auth_token}`
  }

  return req

})
