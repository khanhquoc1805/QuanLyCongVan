
import axiosClient from "./axiosClient";
export interface IDonVi {
    madv: number;
    tendv: string;
}

const donViApi = {
    getDonVi(): Promise<[IDonVi]> {
        const url = "/donvi";
        return axiosClient.get(url);
    },
    getDonByID(madv: string): Promise<IDonVi> {
        const url = `/donvi/${madv}`;
        return axiosClient.get(url);
    },
   
};

export default donViApi;
