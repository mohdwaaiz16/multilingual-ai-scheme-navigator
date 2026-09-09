const fs = require('fs');
const path = require('path');

// Read the old translations.js
const content = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');

// We can just use node to evaluate it since it exports an object
// Wait, translations.js uses `export const translations = { ... }` (ES module)
