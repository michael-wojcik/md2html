#!/usr/bin/env node

import yargs from "yargs"
import lineReader from "line-reader"

/**
 * Node.js CLI script to convert basic markdown into HTML.
 *
 * Output is written to stdout in terminal using console.log().
 * To write to a file, use:
 * ```
 *   node index.mjs > output.html
 * ```
 *
 * @param {string} relFilePath - Relative file path for the markdown file to convert.
 *   Defaults to `./input.md`.
 */

// Get relative file path from command line argument.
const relFilePath = yargs(process.argv.slice(2)).argv._.shift()

// Map markdown to HTML for headers.
const md2HtmlMap = new Map()
md2HtmlMap.set("#", "h1")
md2HtmlMap.set("##", "h2")
md2HtmlMap.set("###", "h3")
md2HtmlMap.set("####", "h4")
md2HtmlMap.set("#####", "h5")
md2HtmlMap.set("######", "h6")

// Convert markdown links to HTML.
const convertLinks = (line) => {
  const regex = /\[(.*?)\]\((.*?)\)/g
  return line.replace(regex, '<a href="$2">$1</a>')
}

// Buffer for temporarily storing lines of multi-line paragraphs.
let buffer = ""
// Read each line of the markdown file.
lineReader.eachLine(relFilePath || "./input.md", function (line, last) {
  // Trim whitespace from line and convert any markdown links to HTML.
  const currLine = convertLinks(line.trim())

  // Handle blank lines.
  if (!currLine) {
    // If buffer is not empty, close paragraph and reset buffer.
    if (buffer) {
      console.log(`${buffer}</p>`)
      buffer = ""
    }
  }
  // Handle headers.
  else if (currLine.startsWith("#")) {
    const headerMd = currLine.match(/^##{0,5} /).shift()
    const headerTag = md2HtmlMap.get(headerMd.trim())
    const headerText = currLine.slice(headerMd.length)
    console.log(`<${headerTag}>${headerText}</${headerTag}>`)
  }
  // Handle paragraphs.
  else {
    // If buffer is empty, open new paragraph.
    if (!buffer) {
      buffer = `<p>${currLine}`
    }
    // If buffer is not empty, append to existing paragraph.
    else {
      buffer += ` ${currLine}`
    }

    // If last line, close paragraph.
    if (last) {
      console.log(`${buffer}</p>`)
    }
  }
});
