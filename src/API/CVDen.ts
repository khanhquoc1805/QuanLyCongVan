import { ListParams } from '../Model/Commom';
import { ICVDen } from '../Model/CVDenModel';
import axiosClient from './axiosClient';

const cvDenApi = {
    getCVDen(params : ListParams) : Promise<[ICVDen]> {
        const url = "/cvden";
        return axiosClient.get(url,{params});
    }
}

export default cvDenApi;