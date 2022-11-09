# md2html

## What?

Node.js CLI script to convert basic markdown into HTML.

Subset of markdown that can be converted:
| Markdown                             | HTML                                              |
|--------------------------------------|---------------------------------------------------|
| # Heading 1                          | `<h1>Heading 1</h1>`                              |
| ## Heading 2                         | `<h2>Heading 2</h2>`                              |
| ...                                  | ...                                               |
| ###### Heading 6                     | `<h6>Heading 6</h6>`                              |
| Unformatted text                     | `<p>Unformatted text</p>`                         |
| [Link text](https://www.example.com) | `<a href="https://www.example.com">Link text</a>` |
| Blank line                           | Ignored                                           |

## How?

Run the script in your terminal by navigating to this directory and running the command:

```shell
  node index.mjs RELATIVE_FILE_PATH
  # OR
  ./index.mjs RELATIVE_FILE_PATH
```

NB. The script takes one argument:

* @param {string} relFilePath - Relative file path for the markdown file to convert.
  * Defaults to `./input.md` which includes example markdown.

## Where?

Output is written to stdout in terminal.

To write to a file, use:

```shell
  node index.mjs RELATIVE_FILE_PATH > output.html
```

## Who?

Created by @michael-wojcik at the request of Mailchimp (who will hopefully hire him 🤞).
