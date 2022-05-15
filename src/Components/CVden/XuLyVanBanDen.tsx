import React, { useEffect } from "react";
import { RoutesProps, useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ThongTinCongVan from "./Tabs/ThongTinCongVan";
import TienTrinhXuLy from "./Tabs/TienTrinhXuLy";
import XuLy from "./Tabs/XuLy";
import { Paper } from "@mui/material";

//import { makeStyles } from "@mui/styles";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

// const useStyle = makeStyles({
//     tab: {
//         "& .MuiTabs-root": {
//             fontFamily: "coiny",
//         },
//     },
// });
export default function XuLyVanBanDen() {
    //const classes = useStyle();
    const local = useLocation();
    const localArr = local.pathname.split("/");
    const macvden = localArr[localArr.length - 1];
    console.log(macvden);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper
            sx={{ width: "100%", backgroundColor: "rgba(232, 229, 231, 0.47)", margin: "40px 0px 40px 0px" }}
            //mt={5}
        >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab
                        label="Thông tin công văn"
                        sx={{
                            textTransform: "none",
                            fontSize: "20px",
                            fontFamily: "sans-serif;",
                        }}
                        {...a11yProps(0)}
                    />
                    <Tab
                        sx={{
                            fontFamily: "sans-serif",
                            textTransform: "none",
                            fontSize: "20px",
                        }}
                        label="Xử lý"
                        {...a11yProps(1)}
                    />
                    <Tab
                        sx={{
                            fontFamily: "sans-serif",
                            textTransform: "none",
                            fontSize: "20px",
                        }}
                        label="Tiến trình xử lý"
                        {...a11yProps(2)}
                    />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ThongTinCongVan macvden={macvden} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <XuLy macvden={macvden}></XuLy>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TienTrinhXuLy macvden={macvden}></TienTrinhXuLy>
            </TabPanel>
        </Paper>
    );
}
