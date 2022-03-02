export const getDateFromString = (date: Date): string => {
    const a = new Date(date);

    return a.toLocaleDateString();
};


