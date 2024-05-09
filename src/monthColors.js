import { bold, hex } from "ansis";

export const monthColors = {
    jan: hex("#979ca2").open,
    [Array.from("jan").reverse().join()]:
        bold.italic.underline.hex("#979ca2").open,
    feb: hex("#2f77c3").open,
    [Array.from("feb").reverse().join()]:
        bold.italic.underline.hex("#2f77c3").open,
    mar: hex("#1126a5").open,
    [Array.from("mar").reverse().join()]:
        bold.italic.underline.hex("#1126a5").open,
    apr: hex("#f8b3ec").open,
    [Array.from("apr").reverse().join()]:
        bold.italic.underline.hex("#f8b3ec").open,
    may: hex("#a4d13a").open,
    [Array.from("may").reverse().join()]:
        bold.italic.underline.hex("#a4d13a").open,
    jun: hex("#28a261").open,
    [Array.from("jun").reverse().join()]:
        bold.italic.underline.hex("#28a261").open,
    jul: hex("#61bf9a").open,
    [Array.from("jul").reverse().join()]:
        bold.italic.underline.hex("#61bf9a").open,
    aug: hex("#eee296").open,
    [Array.from("aug").reverse().join()]:
        bold.italic.underline.hex("#eee296").open,
    sep: hex("#fe8b4c").open,
    [Array.from("sep").reverse().join()]:
        bold.italic.underline.hex("#fe8b4c").open,
    oct: hex("#98512a").open,
    [Array.from("oct").reverse().join()]:
        bold.italic.underline.hex("#98512a").open,
    nov: hex("#2f77c3").open,
    [Array.from("nov").reverse().join()]:
        bold.italic.underline.hex("#2f77c3").open,
    dec: hex("#1126a5").open,
    [Array.from("dec").reverse().join()]:
        bold.italic.underline.hex("#1126a5").open,
};

export const monthNames = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
];
