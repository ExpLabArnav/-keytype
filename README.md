# keytype

A typing trainer where the text you type is real code. Every snippet has explanatory comments inside it, and finishing one reveals what the syntax or algorithm means.

- **Course mode:** pick a language (JavaScript, Python, C, C++, C#, Java, Go) and unlock levels 1-10 in order.
- **Practice mode:** filter by difficulty (easy/medium/hard), type (syntax or DSA) and language.

## Run it
No build step. Open `index.html` in a browser, or serve the folder with any static host (GitHub Pages, Vercel).

## Layout
- `data/snippets.js` all content (the main place to contribute)
- `app.js` typing engine and UI logic
- `style.css` styling

## Contributing
Snippets should be verified in a real compiler or interpreter before merging; see CONTRIBUTING.md.

## License
MIT
