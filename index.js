const fs = require('fs');
const path = require('path');
const Parser = require('./parser');

const filePath = process.argv[2];

if (!filePath) {
  console.log("Please provide a file path as argument.");
  process.exit(1);
}

try {
  const jsonString = fs.readFileSync(path.resolve(filePath), 'utf8');
  const parser = new Parser(jsonString);
  const result = parser.parse();
  console.log("Valid JSON:", result);
  process.exit(0);
} catch (err) {
  console.error("Invalid JSON:", err.message);
  process.exit(1);
}
