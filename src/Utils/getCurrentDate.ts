export const getCurrentDate = (): string => {
    const current = new Date();
    const formatMonth = (month: number): string => {
        if (month < 10) return `0${month}`;
        return `${month}`;
    };

    const monthRight = (month: number): number => {
        return month + 1;
    };
    return `${current.getFullYear()}-${formatMonth(
        monthRight(current.getMonth())
    )}-${current.getDate()}`;
};
