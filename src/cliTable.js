import { bold } from "ansis";
import { monthColors } from "./monthColors.js";
import { parseDate } from "./utils.js";

export function cliTableConfig({ sortBy = "date", sortDir = "asc", from, to }) {
    return {
        columns: [
            { name: "date", alignment: "right" },
            { name: "amount", alignment: "right" },
            { name: "type", alignment: "right" },
            { name: "reference", alignment: "left" },
        ],
        disabledColumns: ["name"],
        colorMap: monthColors,
        filter: (row) => {
            const maybeFrom = from === undefined ? 0 : parseDate(from);
            const maybeTo =
                to === undefined ? Number.MAX_SAFE_INTEGER : parseDate(to);

            return (
                parseDate(row.date) >= maybeFrom &&
                parseDate(row.date) <= maybeTo
            );
        },
        sort: (row1, row2) => {
            let obj1 = row1;
            let obj2 = row2;

            if (sortDir === "desc") {
                obj1 = row2;
                obj2 = row1;
            }

            return parseDate(obj1[sortBy]) - parseDate(obj2[sortBy]);
        },
    };
}

export function printResultsBuilder(state) {
    return (a) => {
        state.cliTable.printTable();
        console.log(
            `Out of the ${bold.underline.blue(
                a.reduce?.((sum, total) => sum + total, 0) ?? a,
            )} transactions that were parsed, there were ${bold.underline.green(
                state.totalRows,
            )} transactions that amounted to a total of ${bold.underline.red(
                JSON.stringify(
                    Math.round((state.totalAmount + Number.EPSILON) * 100) /
                        100,
                ),
            )} GBP.`,
        );
    };
}
