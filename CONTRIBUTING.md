# Contributing

The easiest contribution is a new snippet in `data/snippets.js`.

1. Add it to `course` (a level) or `dsa` (a popular problem, with `d` = easy/medium/hard).
2. Keep it short (under ~12 lines) and put explanatory `//` or `#` comments inside the code. Learners type those comments.
3. Avoid backticks and `${` inside snippets (they are stored in template literals).
4. Run the snippet in a real compiler/interpreter first. Wrong code in a learning tool is worse than a UI bug.
5. Open a pull request describing what the snippet teaches.
