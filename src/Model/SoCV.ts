import { IDonVi } from "../API/DonVi";

export interface ISoCV {
    masocv: string;
    tensocv: string;
    nhomsocv: string;
    madv: string;
    donvi? : IDonVi;
}