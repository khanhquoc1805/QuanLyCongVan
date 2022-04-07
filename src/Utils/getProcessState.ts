export const getProcessState = (str: string): string => {
    if (str === "chuaxuly") return "Chưa Xử lý";
    if (str === "hoanthanhxuly") return "<b>Đã xử lý</b>";
    if (str === "daduyet") return "<b>Đã xử lý</b>";
    if (str === "davaoso") return "<b>Đã vào sổ<br />Chờ phát hành</b>";
    if (str === "daphathanh") return "<b>Đã phát hành</b>";

    return "";
};

export const getColorProcess = (str: string): string => {
    if (str === "chuaxuly") return "red";
    if (str === "daduyet") return "#0aa328";
    if (str === "davaoso") return "#eb17e4";
    if (str === "hoanthanhxuly") return "#0B5C21";
    return "";
};
