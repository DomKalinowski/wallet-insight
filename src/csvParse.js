import { parse } from "@fast-csv/parse";
import config from "../walletconfig.json" assert { type: "json" };
import { monthNames } from "./monthColors.js";

import { createReadStream } from "node:fs";
const processRow = (props) => (row) => {
    const { cliTable, min, max, type, reference } = props;

    const maybeAtLeastMinAmount =
        typeof min === "undefined" || Number.parseFloat(row.amount) >= min;
    const maybeAtMostMaxAmount =
        typeof max === "undefined" || Number.parseFloat(row.amount) <= max;

    if (
        maybeAtLeastMinAmount &&
        maybeAtMostMaxAmount &&
        row.type?.includes(type) &&
        row.reference.toLowerCase()?.includes(reference.toLowerCase())
    ) {
        props.totalAmount += Number.parseFloat(row.amount);

        const dateSplit = row.date.split("/");
        const month = dateSplit[1];
        const year = dateSplit[2];

        const monthIndex = Number.parseInt(month) - 1;
        const monthName = monthNames[monthIndex];
        const isYearEven = year % 2 === 0;
        const color = isYearEven
            ? monthName
            : Array.from(monthName).reverse().join();

        props.totalRows += 1;

        cliTable.addRow(row, { color });
    }
};

const csvParseConfig = (statement) => ({
    ignoreEmpty: true,
    headers: Object.values(config.columns[statement]).map((v) =>
        v ? v : undefined,
    ),
    renameHeaders: true,
});

function analyser({ filePath, statement, state }) {
    return new Promise((resolve, reject) =>
        createReadStream(filePath)
            .pipe(parse(csvParseConfig(statement)))
            .transform((data) => ({
                ...data,
                reference: [
                    data.name,
                    data.reference.replaceAll("\t", "").trim(),
                ]
                    .filter(Boolean)
                    .join(" | "),
                statement,
            }))
            .on("error", reject)
            .on("data", processRow(state))
            .on("end", resolve),
    );
}

const _analyser = analyser;
export { _analyser as analyser };
