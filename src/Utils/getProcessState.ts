export const getProcessState = (str: string): string => {
    if (str === "chuaxuly") return "Chưa Xử lý";
    if(str === "daduyet") return "<b>Đã xử lý</b>";
    if(str === "davaoso") return "<b>Đã vào sổ<br />Chờ phát hành</b>";
    return "";
};

export const getColorProcess = (str: string): string => {
    if (str === "chuaxuly") return "red";
    if(str === "daduyet") return "#0aa328";
    if(str === "davaoso") return "#eb17e4";
   
    return "";
};
