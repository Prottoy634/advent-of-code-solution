const fs = require("fs");

const parseReports = (rawInput) =>
    rawInput
        .trim()
        .split("\n")
        .map((line) => line.split(" ").map(Number));

const calculateAdjacentDiffs = (levels) =>
    levels.slice(1).map((level, index) => level - levels[index]);

const isGraduallyIncreasing = (diffs) => diffs.every((diff) => diff >= 1 && diff <= 3);

const isGraduallyDecreasing = (diffs) => diffs.every((diff) => diff >= -3 && diff <= -1);

const isSafeReport = (levels) => {
    const adjacentDiffs = calculateAdjacentDiffs(levels);
    return isGraduallyIncreasing(adjacentDiffs) || isGraduallyDecreasing(adjacentDiffs);
};

const countSafeReports = (reports) => reports.filter(isSafeReport).length;

const rawInput = fs.readFileSync("input.txt", "utf8");
const reports = parseReports(rawInput);

console.log("Safe reports:", countSafeReports(reports));
