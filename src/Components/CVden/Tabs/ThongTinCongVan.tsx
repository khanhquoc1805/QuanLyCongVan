import { tableBodyClasses } from "@mui/material";
import { Grid, Table, TableRow, TableCell, TableBody } from "@mui/material";
import React, { ReactElement, useEffect } from "react";
import cvDenApi from "../../../API/CVDen";
import { ICVDen } from "../../../Model/CVDenModel";
import { getProcessState } from "../../../Utils/getProcessState";

interface Props {}

const title1: string[] = [
    "Số hiệu",
    "Trích yếu",
    "Ngày đến",
    "Loại văn bản",
    "Cơ quan ban hành",
    "Ngày ban hành",
    "Đính kèm",
];

const title3: string[] = ["Đơn vị tiếp nhận", "Ngày gửi", "Người gửi"];

const title2: string[] = [
    "Số đến",
    "Độ mật",
    "Độ khẩn",
    "Lĩnh vực",
    "Ý kiến bút phê",
    "Văn bản đến cùng hệ thống",
];

const title4: string[] = [
    "Trạng thái xử lý",
    "Hạn xử lý của tôi",
    "Hạn xử lý toàn văn bản",
];
export default function ThongTinCongVan(props: { macvden: string }) {
    const { macvden } = props;
    const [data, setData] = React.useState<ICVDen>();

    useEffect(() => {
        (async () => {
            const data = await cvDenApi.getCVDenById(macvden);
            setData(data);
        })();
    }, []);
    const ngayden = new Date(`${data?.cvden.ngaycvden}`).toLocaleString();
    const ngaybanhanh = new Date(`${data?.cvden.ngaybanhanh}`).toLocaleString();
    const hanxuly = new Date(`${data?.cvden.hanxuli}`).toLocaleString();
    const data1: string[] = [
        `${data?.cvden.sohieugoc}`,
        `${data?.cvden.tencvden}`,
        `${ngayden}`,
        `${data?.loaicv.tenloai}`,
        `${data?.cvden.coquanbanhanh}`,
        `${ngaybanhanh}`,
        `${data?.ttbosung.dinhkem}`.split("/").pop() || "",
    ];
    const data2: string[] = [
        `${data?.cvden.soden}`,
        `${data?.ttbosung.domat}`,
        `${data?.ttbosung.dokhan}`,
        `${data?.linhvuc.tenlv}`,
        "",
        "",
        "",
    ];
    const data3: string[] = [
        `${data?.donvi.tendv}`,
        "",
        `${data?.cvden.nguoiky}`,
    ];
    const data4: string[] = [
        getProcessState(`${data?.cvden.xuly}`),
        "",
        `${hanxuly}`,
    ];
    return (
        <>
            <Grid container spacing={2}>
                <Grid item lg={6}>
                    <Table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                    >
                        <TableBody>
                            {title1.map((element, index) => (
                                <TableRow
                                    hover={true}
                                    key={index}
                                    style={{
                                        textAlign: "left",
                                    }}
                                >
                                    <TableCell
                                        style={{
                                            border: "1px solid #F0F7F7",
                                            fontWeight: "bolder",
                                        }}
                                    >
                                        {element}
                                    </TableCell>
                                    <TableCell
                                        sx={{ maxWidth: "240px" }}
                                        style={{ border: "1px solid #F0F7F7" }}
                                    >
                                        {data1[index]}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item lg={6}>
                    <Table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                    >
                        <TableBody>
                            {title2.map((element, index) => (
                                <TableRow
                                    hover={true}
                                    key={index}
                                    style={{
                                        textAlign: "left",
                                    }}
                                >
                                    <TableCell
                                        style={{
                                            border: "1px solid #F0F7F7",
                                            fontWeight: "bolder",
                                            width: "200px",
                                        }}
                                    >
                                        {element}
                                    </TableCell>
                                    <TableCell
                                        sx={{ maxWidth: "240px" }}
                                        style={{ border: "1px solid #F0F7F7" }}
                                    >
                                        {data2[index]}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item lg={12}>
                    <hr />
                </Grid>

                <Grid item lg={6}>
                    <Table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                    >
                        <TableBody>
                            {title3.map((element, index) => (
                                <TableRow
                                    hover={true}
                                    key={index}
                                    style={{
                                        textAlign: "left",
                                    }}
                                >
                                    <TableCell
                                        style={{
                                            border: "1px solid #F0F7F7",
                                            fontWeight: "bolder",
                                           
                                        }}
                                    >
                                        {element}
                                    </TableCell>
                                    <TableCell
                                        sx={{ maxWidth: "240px" }}
                                        style={{ border: "1px solid #F0F7F7" }}
                                    >
                                        {data3[index]}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item lg={6}>
                    <Table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                    >
                        <TableBody>
                            {title4.map((element, index) => (
                                <TableRow
                                    hover={true}
                                    key={index}
                                    style={{
                                        textAlign: "left",
                                    }}
                                >
                                    <TableCell
                                        style={{
                                            border: "1px solid #F0F7F7",
                                            fontWeight: "bolder",
                                            width: "200px"
                                        }}
                                    >
                                        {element}
                                    </TableCell>
                                    <TableCell
                                        sx={{ maxWidth: "240px" }}
                                        style={{ border: "1px solid #F0F7F7" }}
                                    >
                                        {data4[index]}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </>
    );
}
