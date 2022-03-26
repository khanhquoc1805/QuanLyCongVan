import {
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Typography,
} from "@mui/material";
import React, { ReactElement } from "react";

interface Props {}

export default function TienTrinhXuLy() {
    return (
        <div style={{ backgroundColor: "#F0F7F7", padding: "24px" }}>
            <Stepper orientation="vertical">
                <Step active={true}>
                    <StepLabel>
                        <p style={{ color: "red", fontSize: "20px" }}>
                            Văn thư đang xử lý
                        </p>
                    </StepLabel>
                    <StepContent>
                        <Typography
                            style={{
                                fontWeight: "bolder",
                            }}
                        >
                            Hạn xử lý: không giới hạn
                        </Typography>
                    </StepContent>
                </Step>

                <Step active={true}>
                    <StepLabel>
                        <p style={{ color: "red", fontSize: "20px" }}>
                            Cán bộ phối hợp đang xử lí
                        </p>
                    </StepLabel>
                    <StepContent>
                        <Typography
                            style={{
                                fontWeight: "bolder",
                            }}
                        >
                            Hạn xử lý: không giới hạn
                        </Typography>
                    </StepContent>
                </Step>
            </Stepper>
        </div>
    );
}
