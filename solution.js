const fs = require("fs");
const path = require("path");

const parseReports = (rawInput) =>
    rawInput
        .trim()
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map((line) => line.split(/\s+/).map(Number));

const calculateAdjacentDiffs = (levels) =>
    levels.slice(1).map((level, index) => level - levels[index]);

const isGraduallyIncreasing = (diffs) => diffs.every((diff) => diff >= 1 && diff <= 3);

const isGraduallyDecreasing = (diffs) => diffs.every((diff) => diff >= -3 && diff <= -1);

const isSafeReport = (levels) => {
    if (levels.length < 2) return false;
    if (!levels.every(Number.isFinite)) return false;

    const adjacentDiffs = calculateAdjacentDiffs(levels);
    return isGraduallyIncreasing(adjacentDiffs) || isGraduallyDecreasing(adjacentDiffs);
};

const countSafeReports = (reports) => reports.filter(isSafeReport).length;

const rawInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const reports = parseReports(rawInput);

console.log("Safe reports:", countSafeReports(reports));
