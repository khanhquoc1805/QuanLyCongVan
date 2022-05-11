export const getDateFromString = (date: Date): string => {
    const a = new Date(date);

    return a.toLocaleDateString();
};

export const changeDateFromString = (date: string): string => {
    const b = new Date(date);
    let [day, month, year] = b.toLocaleDateString().split("/");
    if (parseInt(month) < 10) {
        month = `0${month}`;
    }
    return `${year}-${month}-${day}`;
};
