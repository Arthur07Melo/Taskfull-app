import { AxiosError, AxiosResponse } from "axios";



export default function checkTokenValidation(err: AxiosError){
    if(err.response?.status === 401){
        sessionStorage.clear();
        window.location.reload();
    }
}