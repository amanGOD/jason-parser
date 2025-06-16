class Lexer {
  constructor(input) {
    this.input = input;
    this.position = 0;
  }

  nextChar() {
    return this.input[this.position++];
  }

  peek() {
    return this.input[this.position];
  }

  skipWhitespace() {
    while (/\s/.test(this.peek())) {
      this.nextChar();
    }
  }

  nextToken() {
    this.skipWhitespace();
    const char = this.nextChar();

    if (char === '{' || char === '}' || char === ':' || char === ',') {
      return { type: char };
    }

    if (char === '"') {
      let value = '';
      while (this.peek() !== '"') {
        value += this.nextChar();
      }
      this.nextChar();
      return { type: 'STRING', value };
    }

    if (/[0-9]/.test(char)) {
      let num = char;
      while (/[0-9]/.test(this.peek())) {
        num += this.nextChar();
      }
      return { type: 'NUMBER', value: Number(num) };
    }

    if (char === 't' && this.input.substr(this.position - 1, 4) === 'true') {
      this.position += 3;
      return { type: 'BOOLEAN', value: true };
    }

    if (char === 'f' && this.input.substr(this.position - 1, 5) === 'false') {
      this.position += 4;
      return { type: 'BOOLEAN', value: false };
    }

    if (char === 'n' && this.input.substr(this.position - 1, 4) === 'null') {
      this.position += 3;
      return { type: 'NULL', value: null };
    }

    throw new Error("Unexpected character: " + char);
  }
}

module.exports = Lexer;
