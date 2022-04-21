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
breadcrumbMap.set('quanlyso', 'Quản lý sổ')
breadcrumbMap.set('quanlycongvanden', 'Văn bản đến')
breadcrumbMap.set('tiepnhanvanbanden', 'Tiếp nhận văn bản đến')
breadcrumbMap.set('vanbancunghethong', 'Văn bản cùng hệ thống')
breadcrumbMap.set('vanbancanxuly', 'Văn bản cần xử lý')
breadcrumbMap.set('vanbandavaoso', 'Văn bản đã vào sổ')

breadcrumbMap.set('quanlycongvandi', 'Quản lý văn bản đi')
breadcrumbMap.set('duthaovanbandi', 'Dự thảo văn bản đi')
breadcrumbMap.set('xulivanbandi', 'Xử lý văn bản đi')
breadcrumbMap.set('phathanhvanbandi', 'Phát hành văn bản đi')


export default function MyBreadcrumbs() {
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
        <div role="presentation" onClick={handleClick} style={{marginTop: '16px'}}>
            <Breadcrumbs aria-label="breadcrumb">
                {breadcrumbs.map((route, index) => (
                    <Link
                        underline="hover"
                        color="inherit"
                        onClick={() => {
                            navigate(`${route.link}`);
                        }}
                        sx={{color: "#1e8eff", fontWeight: 'bolder', cursor: 'pointer'}}
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
