import axios from "axios";
import CookiesService from "../../services/cookie-service";

export const http = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${CookiesService.getAuthorizationToken()}`
    }
})

http.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    console.log(error)
    if(error.response.status === 401 && window.location.pathname !== '/sign-in'){
        window.location.href = '/sign-in'
        console.log(window.location)
    }
    if(error.status)
    return Promise.reject(error);
});