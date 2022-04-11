"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nFormatter = void 0;
/**
 * memformat angka seperti 1000 menjadi 1k dan seterusnya
 *
 * @param {number | string} num
 * @returns
 */
function nFormatter(num) {
    num = typeof num === "string" ? parseInt(num) : num;
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
        .slice()
        .reverse()
        .find(function (item) {
        return num >= item.value;
    });
    return item
        ? (num / item.value).toFixed(1).replace(rx, "$1") + item.symbol
        : "0";
}
exports.nFormatter = nFormatter;
