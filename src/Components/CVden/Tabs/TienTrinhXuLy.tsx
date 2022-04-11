import {
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Typography,
} from "@mui/material";
import React, { ReactElement, useEffect } from "react";
import cvDenApi from "../../../API/CVDen";
import { InfoXuLy } from "../../../Model/CVDenModel";
import { getColorProcess } from "../../../Utils/getProcessState";
import { getRoleProcess } from "../../../Utils/getRoleFormString";

export default function TienTrinhXuLy(props: { macvden: string }) {
    const { macvden } = props;
    const [infoXuLy, setInfoXuLy] = React.useState<[InfoXuLy]>();
    useEffect(() => {
        (async () => {
            const data = await cvDenApi.getInfoXuLy(macvden);
            setInfoXuLy(data);
        })();
    }, []);
    return (
        <div style={{ backgroundColor: "#F0F7F7", padding: "24px" }}>
            <Stepper orientation="vertical">
                {infoXuLy &&
                    infoXuLy.map((info, index) => (
                        <Step active={true} key={index}>
                            <StepLabel>
                                <p
                                    style={{
                                        color: "#BC05E6",
                                        fontSize: "20px",
                                    }}
                                >
                                    {`${info.nv.tennv}`}{" "}
                                    <span
                                        style={{
                                            color: getColorProcess(
                                                `${info.xuly.trangthai}`
                                            ),
                                        }}
                                    >
                                        {`${info.xuly.trangthai}` === "chuaxuly"
                                            ? "đang xử lý"
                                            : "đã hoàn thành xử lý"}
                                    </span>
                                </p>
                            </StepLabel>
                            <StepContent>
                                <Typography
                                    style={{
                                        fontWeight: "bolder",
                                    }}
                                >
                                    Vai trò:{" "}
                                    {getRoleProcess(`${info.xuly.vaitro}`)}
                                </Typography>
                            </StepContent>
                            <StepContent>
                                <Typography
                                    style={{
                                        fontWeight: "bolder",
                                    }}
                                >
                                    Chức vụ: {`${info.nv.chucvu}`}
                                </Typography>
                            </StepContent>
                            <StepContent>
                                <Typography
                                    style={{
                                        fontWeight: "bolder",
                                    }}
                                >
                                    Bút phê:{" "}
                                    <span
                                        style={{ color: "#5FE35D" }}
                                    >{`${info.xuly.butphe}`}</span>
                                </Typography>
                            </StepContent>
                            <StepContent>
                                <Typography
                                    style={{
                                        fontWeight: "bolder",
                                    }}
                                >
                                    Hạn xử lý:{" "}
                                    {`${info.xuly.hanxuly}` !== "null"
                                        ? new Date(
                                              `${info.xuly.hanxuly}`
                                          ).toLocaleString()
                                        : "Không giới hạn"}
                                </Typography>
                            </StepContent>
                        </Step>
                    ))}
            </Stepper>
        </div>
    );
}
