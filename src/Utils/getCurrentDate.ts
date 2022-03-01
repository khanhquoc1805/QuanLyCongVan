export const getCurrentDate = (): string => {
    const current = new Date();
    const formatMonth = (month: number): string => {
        if (month < 10) return `0${month}`;
        return `${month}`;
    };
    const formatDay = (day: number): string => {
        if (day < 10) return `0${day}`;
        return `${day}`;
    };

    const monthRight = (month: number): number => {
        return month + 1;
    };
    return `${current.getFullYear()}-${formatMonth(
        monthRight(current.getMonth())
    )}-${formatDay(current.getDate())}`;
};
