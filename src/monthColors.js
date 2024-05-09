const ansis = require("ansis");

exports.monthColors = {
    jan: ansis.hex("#979ca2").open,
    [Array.from("jan").reverse().join()]:
        ansis.bold.italic.underline.hex("#979ca2").open,
    feb: ansis.hex("#2f77c3").open,
    [Array.from("feb").reverse().join()]:
        ansis.bold.italic.underline.hex("#2f77c3").open,
    mar: ansis.hex("#1126a5").open,
    [Array.from("mar").reverse().join()]:
        ansis.bold.italic.underline.hex("#1126a5").open,
    apr: ansis.hex("#f8b3ec").open,
    [Array.from("apr").reverse().join()]:
        ansis.bold.italic.underline.hex("#f8b3ec").open,
    may: ansis.hex("#a4d13a").open,
    [Array.from("may").reverse().join()]:
        ansis.bold.italic.underline.hex("#a4d13a").open,
    jun: ansis.hex("#28a261").open,
    [Array.from("jun").reverse().join()]:
        ansis.bold.italic.underline.hex("#28a261").open,
    jul: ansis.hex("#61bf9a").open,
    [Array.from("jul").reverse().join()]:
        ansis.bold.italic.underline.hex("#61bf9a").open,
    aug: ansis.hex("#eee296").open,
    [Array.from("aug").reverse().join()]:
        ansis.bold.italic.underline.hex("#eee296").open,
    sep: ansis.hex("#fe8b4c").open,
    [Array.from("sep").reverse().join()]:
        ansis.bold.italic.underline.hex("#fe8b4c").open,
    oct: ansis.hex("#98512a").open,
    [Array.from("oct").reverse().join()]:
        ansis.bold.italic.underline.hex("#98512a").open,
    nov: ansis.hex("#2f77c3").open,
    [Array.from("nov").reverse().join()]:
        ansis.bold.italic.underline.hex("#2f77c3").open,
    dec: ansis.hex("#1126a5").open,
    [Array.from("dec").reverse().join()]:
        ansis.bold.italic.underline.hex("#1126a5").open,
};

exports.monthNames = [
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