export const getPermission = (): string => {
    const token = localStorage.getItem("access_token");
    try {
        const payload = JSON.parse(atob(token?.split(".")[1] ?? ""));
        return payload.quyen;
    } catch (e) {
        return "";
    }
};

export const getDonViFromToken = (): number => {
    const token = localStorage.getItem("access_token");

    try {
        const payload = JSON.parse(atob(token?.split(".")[1] ?? ""));
        return payload.donvi;
    } catch (e) {
        return 0;
    }
};

export const getMaNVFromToken = (): string => {
    const token = localStorage.getItem("access_token");

    try {
        const payload = JSON.parse(atob(token?.split(".")[1] ?? ""));
        console.log(payload);
        return payload.manv;
    } catch (e) {
        return "";
    }
};

export const getTenNVFromToken = (): string => {
    const token = localStorage.getItem("access_token");

    try {
        const payload = JSON.parse(atob(token?.split(".")[1] ?? ""));
        console.log(payload);
        return payload.tennv;
    } catch (e) {
        return "";
    }
};
