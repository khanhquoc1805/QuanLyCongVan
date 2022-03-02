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
};

export default donViApi;
