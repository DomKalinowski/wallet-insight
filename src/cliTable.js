const { monthColors } = require("./monthColors");
const parseDate = (date) => Date.parse(date.split("/").reverse().join("-"));
const ansis = require("ansis");

exports.cliTableConfig = {
    columns: [
        { name: "date", alignment: "right" },
        { name: "amount", alignment: "right" },
        { name: "type", alignment: "right" },
        { name: "reference", alignment: "left" },
    ],
    colorMap: monthColors,
    sort: (row1, row2) => parseDate(row1.date) - parseDate(row2.date),
};

exports.printResultsBuilder = (state) => (a) => {
    state.cliTable.printTable();
    console.log(
        `Out of the ${ansis.bold.underline.blue(
            a.reduce?.((sum, total) => sum + total, 0) ?? a,
        )} transactions that were parsed, there were ${ansis.bold.underline.green(
            state.totalRows,
        )} transactions that amounted to a total of ${ansis.bold.underline.red(
            JSON.stringify(Math.round((state.totalAmount + Number.EPSILON) * 100) / 100),
        )} GBP.`,
    );
};
