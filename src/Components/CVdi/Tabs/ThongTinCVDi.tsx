import { Grid, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import cvDiApi from "../../../API/CVdi";
import { ICVDi } from "../../../Model/CVDiModel";
import { getProcessState } from "../../../Utils/getProcessState";

interface Props {}

const title1: string[] = [
    "Trích yếu",
    "Ngày ra văn bản đi",
    "Loại văn bản",
    "Cơ quan ban hành",
    "Đính kèm",
];

const title3: string[] = ["Đơn vị tiếp nhận", "Hạn xử lý toàn văn bản",];

const title2: string[] = [
    "Độ mật",
    "Độ khẩn",
    "Lĩnh vực",
    "Thực hiện theo văn bản",
    "Ý kiến bút phê",
];

const title4: string[] = [
    "Trạng thái xử lý",
    "Hạn xử lý của tôi",
   
];
export default function ThongTinCVDi(props: { mavbdi: string }) {
    const { mavbdi } = props;
    const [data, setData] = React.useState<ICVDi>();

    useEffect(() => {
        (async () => {
            const data = await cvDiApi.getCVDiById(mavbdi);
            setData(data);
        })();
    }, []);
    console.log(data);
    const ngayravbdi = new Date(`${data?.cvdi.ngayravbdi}`).toLocaleString();
    // const ngaybanhanh = new Date(`${data?.cvden.ngaybanhanh}`).toLocaleString();
    // const hanxuly = new Date(`${data?.cvden.hanxuli}`).toLocaleString();
    const data1: string[] = [
        `${data?.cvdi.tenvbdi}`,
        `${ngayravbdi}`,
        `${data?.loaicv.tenloai}`,
        `${data?.donvi.tendv}`,
        `${data?.ttbosung.dinhkem}`.split("/").pop() || "",
    ];
    const data2: string[] = [
        `${data?.ttbosung.domat}`,
        `${data?.ttbosung.dokhan}`,
        `${data?.linhvuc.tenlv}`,
        "",
        "",
        "",
    ];
    const data3: string[] = [
        // "Khoa CNTT,Khoa KT",
        // "Khoa KT",
        "",
    ];
    const data4: string[] = [getProcessState(`${data?.cvdi.ttxuly}`), "", ""];
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
                                            border: "1px solid #98A7B8",
                                            fontWeight: "bolder",
                                        }}
                                    >
                                        {element}
                                    </TableCell>
                                    <TableCell
                                        sx={{ maxWidth: "240px" }}
                                        style={{ border: "1px solid #98A7B8" }}
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
                                            border: "1px solid #98A7B8",
                                            fontWeight: "bolder",
                                        }}
                                    >
                                        {element}
                                    </TableCell>
                                    <TableCell
                                        sx={{ maxWidth: "240px" }}
                                        style={{ border: "1px solid #98A7B8" }}
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
                                            border: "1px solid #98A7B8",
                                            fontWeight: "bolder",
                                        }}
                                    >
                                        {element}
                                    </TableCell>
                                    <TableCell
                                        sx={{ maxWidth: "240px" }}
                                        style={{ border: "1px solid #98A7B8" }}
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
                                            border: "1px solid #98A7B8",
                                            fontWeight: "bolder",
                                        }}
                                    >
                                        {element}
                                    </TableCell>
                                    <TableCell
                                        sx={{ maxWidth: "240px" }}
                                        style={{ border: "1px solid #98A7B8" }}
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
