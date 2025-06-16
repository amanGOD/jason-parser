const Lexer = require('./lexer');

class Parser {
  constructor(input) {
    this.lexer = new Lexer(input);
  }

  parse() {
    this.token = this.lexer.nextToken();
    if (this.token?.type !== '{') throw new Error("Expected '{'");

    const obj = {};
    this.token = this.lexer.nextToken();

    if (this.token?.type === '}') return obj;

    while (true) {
      if (this.token?.type !== 'STRING') throw new Error("Expected string key");
      const key = this.token.value;

      this.token = this.lexer.nextToken();
      if (this.token?.type !== ':') throw new Error("Expected ':'");

      this.token = this.lexer.nextToken();
      if (['STRING', 'NUMBER', 'BOOLEAN', 'NULL'].includes(this.token?.type)) {
        obj[key] = this.token.value;
      } else {
        throw new Error("Invalid value type");
      }

      this.token = this.lexer.nextToken();
      if (this.token?.type === '}') break;
      if (this.token?.type !== ',') throw new Error("Expected ','");
      this.token = this.lexer.nextToken();
    }

    return obj;
  }
}

module.exports = Parser;
