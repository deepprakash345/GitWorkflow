
type TokenType = string

const TOK_DOT: TokenType = 'DOT';
const TOK_IDENTIFIER: TokenType = 'Identifier';
const TOK_GLOBAL: TokenType = 'Global';
const TOK_BRACKET = 'bracket';
const TOK_NUMBER = 'Number';

const globalStartToken = '$';

export type Token = {
    type: TokenType
    value: string|number
    start: number
}

export const identifier = (value: string, start: number) => {
    return {
        type: TOK_IDENTIFIER,
        value,
        start
    };
};

export const bracket = (value: number, start: number) => {
    return {
        type: TOK_BRACKET,
        value,
        start
    };
};

export const global$ = () => {
    return {
        type: TOK_GLOBAL,
        start: 0,
        value: globalStartToken
    };
};


const isAlphaNum = function (ch: string) {
    return (ch >= 'a' && ch <= 'z')
        || (ch >= 'A' && ch <= 'Z')
        || (ch >= '0' && ch <= '9')
        || ch === '_';
};

const isGlobal = (prev: Token | null, stream: string, pos: number) => {
    // global tokens occur only at the start of an expression
    return prev === null && stream[pos] === globalStartToken;
};

const isIdentifier = (stream: string, pos: number) => {
    const ch = stream[pos];
    // $ is special -- it's allowed to be part of an identifier if it's the first character
    if (ch === '$') {
        return stream.length > pos && isAlphaNum(stream[pos + 1]);
    }
    // return whether character 'isAlpha'
    return (ch >= 'a' && ch <= 'z')
        || (ch >= 'A' && ch <= 'Z')
        || ch === '_';
};

const isNum =  (ch : string) => {
    return (ch >= '0' && ch <= '9');
};

class Tokenizer {
    _current: number
    _tokens: Token[] = []
    _result_tokens: Token[] = []
    constructor(private stream: string) {
        this._current = 0;
    }

    private _consumeGlobal(): Token {
        this._current += 1;
        return global$();
    }

    private _consumeUnquotedIdentifier(stream: string): Token {
        const start = this._current;
        this._current += 1;
        while (this._current < stream.length && isAlphaNum(stream[this._current])) {
            this._current += 1;
        }
        return identifier(stream.slice(start, this._current), start);
    }

    private _consumeQuotedIdentifier(stream: string): Token {
        const start = this._current;
        this._current += 1;
        const maxLength = stream.length;
        while (stream[this._current] !== '"' && this._current < maxLength) {
            // You can escape a double quote and you can escape an escape.
            let current = this._current;
            if (stream[current] === '\\' && (stream[current + 1] === '\\'
                || stream[current + 1] === '"')) {
                current += 2;
            } else {
                current += 1;
            }
            this._current = current;
        }
        this._current += 1;
        return identifier(JSON.parse(stream.slice(start, this._current)), start);
    }

    private _consumeNumber(stream: string): Token {
        const start = this._current;
        this._current += 1;
        const maxLength = stream.length;
        while (isNum(stream[this._current]) && this._current < maxLength) {
            this._current += 1;
        }
        const n = stream.slice(start, this._current);
        let value = parseInt(n, 10);
        return { type: TOK_NUMBER, value, start };
    }

    _consumeBracket(stream: string) {
        const start = this._current;
        this._current += 1;
        let value: number;
        if (isNum(stream[this._current])) {
            value = this._consumeNumber(stream).value as number;
        } else {
            throw new Error(`unexpected exception at position ${this._current}. Must be a character`);
        }
        if (this._current < this.stream.length && stream[this._current] !== ']') {
            throw new Error(`unexpected exception at position ${this._current}. Must be a character`);
        }
        this._current++;
        return bracket(value, start);
    }

    tokenize() {
        const stream = this.stream;
        while (this._current < stream.length) {
            const prev = this._tokens.length ? this._tokens.slice(-1)[0] : null;
            if (isGlobal(prev, stream, this._current)) {
                const token = this._consumeGlobal();
                this._tokens.push(token);
                this._result_tokens.push(token);
            } else if (isIdentifier(stream, this._current)) {
                const token = this._consumeUnquotedIdentifier(stream);
                this._tokens.push(token);
                this._result_tokens.push(token);
            } else if (stream[this._current]  === '.' && prev != null && prev.type !== TOK_DOT) {
                this._tokens.push({
                    type: TOK_DOT,
                    value: '.',
                    start: this._current
                });
                this._current += 1;
            } else if (stream[this._current] === '[') {
                // No need to increment this._current.  This happens
                // in _consumeLBracket
                const token = this._consumeBracket(stream);
                this._tokens.push(token);
                this._result_tokens.push(token);
            } else if (stream[this._current] === '"') {
                const token = this._consumeQuotedIdentifier(stream);
                this._tokens.push(token);
                this._result_tokens.push(token);
            } else {
                const p = Math.max(0, this._current - 2);
                const s = Math.min(this.stream.length, this._current + 2);
                throw new Error(`Exception at parsing stream ${this.stream.slice(p, s)}`);
            }
        }
        return this._result_tokens;
    }
}

export const tokenize = (stream: string): Token[] => {
    return new Tokenizer(stream).tokenize();
};

export const resolveData = (data: any, input: Token[] | string, create?: any) => {
    let tokens: Token[];
    if (typeof input === 'string') {
        tokens = tokenize(input);
    } else {
        tokens = input;
    }
    let result = data;
    let parentResult = data;
    let i = 0;
    while (i < tokens.length && result != null) {
        const token = tokens[i];
        if (token.type === TOK_GLOBAL) {
            parentResult = data;
            result = data;
        } else if (token.type === TOK_IDENTIFIER) {
            if (typeof result !== 'object') {
                throw new Error(`Looking for ${token.value} in ${result}`);
            }
            parentResult = result;
            if (token.value in parentResult && parentResult[token.value] !== null) {
                result = parentResult[token.value];
            } else if (create) {
                const nextToken = i < tokens.length - 1? tokens[i + 1] : null;
                const toCreate = nextToken === null ? create : (nextToken.type === TOK_BRACKET  ? [] : {});
                parentResult[token.value] = toCreate;
                result = parentResult[token.value];
            } else {
                result = undefined;
            }
        } else if (token.type === TOK_BRACKET) {
            if (!(result instanceof Array)) {
                throw new Error(`Looking for index ${token.value} in non array${result}`);
            }
            const index = token.value as number;
            parentResult = result;
            if (index < result.length) {
                result = result[index];
            } else if (create) {
                const nextToken = i < tokens.length - 1 ? tokens[i + 1] : null;
                const toCreate = nextToken === null ? create : (nextToken.type === TOK_BRACKET  ? [] : {});
                parentResult[index] = toCreate;
                result = parentResult[index];
            } else {
                result = undefined;
            }
        }
        i += 1;
    }
    return {
        result: result,
        parent: parentResult
    };
};