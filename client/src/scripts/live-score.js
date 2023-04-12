import fetch from "node-fetch";
import { load } from "cheerio";
import fs from "fs";

const url =
  "https://www.espncricinfo.com/series/indian-premier-league-2023-1345038/points-table-standings";

const response = await fetch(url);
const body = await response.text();

let $ = load(body);
fs.writeFileSync("test.html", $.html());

const table = $("table");

// console.log(table.html());

console.log(load(table.html())().text());
// Print the table data
// console.log(table.text());
