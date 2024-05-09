export const parseDate = (date) =>
    Date.parse(date.split("/").reverse().join("-"));
