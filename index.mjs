import lineReader from "line-reader";

lineReader.eachLine("./input.md", function (line, last) {
  console.log(line);
  if (last) console.log("\nDone reading!");
});
