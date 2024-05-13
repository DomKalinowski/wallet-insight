import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bold, yellow } from "ansis";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let asciMascot;

const NO_ELEPHANTS_ERROR_MSG = `
Our ASCII elephant took a detour to grab some peanuts and couldn't load in time.
`;
export const getMascot = () => {
    try {
        asciMascot = readFileSync(
            path.resolve(__dirname, "./ascii-mascot-small.ans"),
        );
    } catch (err) {
        throw new Error(yellow(NO_ELEPHANTS_ERROR_MSG) + bold.red(err));
    }

    return asciMascot;
};
