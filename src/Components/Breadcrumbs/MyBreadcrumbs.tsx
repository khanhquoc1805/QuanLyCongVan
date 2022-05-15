import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useLocation, useNavigate } from "react-router-dom";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
}

export interface IMyBreadcrumbs {
    title: string;
    link: string;
}

interface MyBreadcrumbsProps {
    breadcrumbs: IMyBreadcrumbs[];
}

const breadcrumbMap = new Map();
breadcrumbMap.set("quanlyso", "Quản lý sổ");
breadcrumbMap.set("quanlycongvanden", "Công văn đến");
breadcrumbMap.set("tiepnhancongvanden", "Tiếp công văn bản đến");
breadcrumbMap.set("congvancunghethong", "Công văn cùng hệ thống");
breadcrumbMap.set("congvancanxuly", "Công văn cần xử lý");
breadcrumbMap.set("congvanluutru", "Công văn lưu trữ");
breadcrumbMap.set("tiepnhancongvannhap", "Nháp tiếp nhận");

breadcrumbMap.set("quanlycongvandi", "Quản lý công văn đi");
breadcrumbMap.set("duthaocongvandi", "Dự thảo công văn đi");
breadcrumbMap.set("xulicongvandi", "Xử lý công văn đi");
breadcrumbMap.set("phathanhcongvandi", "Phát hành công văn đi");
breadcrumbMap.set("duthaocongvannhap", "Nháp dự thảo");

export default function MyBreadcrumbs(props: { color: string }) {
    const { color } = props;
    let url = "";
    const navigate = useNavigate();
    const location = useLocation();
    const breadcrumbs: IMyBreadcrumbs[] = location.pathname
        .split("/")
        .map((route) => {
            if (route === "") {
                return { title: "Trang chủ", link: "/home" };
            }
            url += `/${route}`;
            return { title: breadcrumbMap.get(route), link: `${url}` };
        });

    return (
        <div
            role="presentation"
            onClick={handleClick}
            style={{ margin: "16px 0px 0px 80px" }}
        >
            <Breadcrumbs aria-label="breadcrumb">
                {breadcrumbs.map((route, index) => (
                    <Link
                        underline="hover"
                        color="inherit"
                        key={index}
                        onClick={() => {
                            navigate(`${route.link}`);
                        }}
                        sx={{
                            color: color,
                            fontWeight: "bolder",
                            cursor: "pointer",
                            fontSize: "22px",
                        }}
                    >
                        {route.title}
                    </Link>
                ))}
                {/* <Link underline="hover" color="inherit" href="/">
                    MUI
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Core
                </Link>
                <Typography color="text.primary">Breadcrumbs</Typography> */}
            </Breadcrumbs>
        </div>
    );
}
