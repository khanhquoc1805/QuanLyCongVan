import axiosClient from './axiosClient';
import { ListParams } from '../Model/Commom';

const soCVApi = {
    getSoCV (params : ListParams) : Promise<any>{
        const url = "socv";
        return axiosClient.get(url,{params})
    }
}

export default soCVApi;