export const getRoleProcess = (str: string): string => {
    if (str === "xulychinh") return "Xử lý chính";
    if (str === "xulykethop") return "Xử lý kết hợp";
    return "";
};

export const xulystring = (index: number, str: string): string => {
    return `${str}${index}`;
};
