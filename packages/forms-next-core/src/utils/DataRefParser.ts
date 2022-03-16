/**
 * Defines utilities to parse form data
 */

import DataGroup from '../data/DataGroup';
import DataValue from '../data/DataValue';

type TokenType = string

const TOK_DOT: TokenType = 'DOT';
const TOK_IDENTIFIER: TokenType = 'Identifier';
export const TOK_GLOBAL: TokenType = 'Global';
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
        const value = parseInt(n, 10);
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

export const resolveData = <T extends DataValue>(data: DataGroup,
                                                 input: Token[] | string,
                                                 create?: T): DataGroup | DataValue | undefined => {
    let tokens: Token[];
    if (typeof input === 'string') {
        tokens = tokenize(input);
    } else {
        tokens = input;
    }
    let result: DataGroup | DataValue | undefined = data;
    let i = 0;

    const createIntermediateNode = (token: Token, nextToken: Token|null, create: T) => {
        return nextToken === null ? create :
            (nextToken.type === TOK_BRACKET)  ? new DataGroup(token.value, [], 'array') :
                new DataGroup(token.value, {});
    };

    while (i < tokens.length && result != null) {
        const token = tokens[i];
        if (token.type === TOK_GLOBAL) {
            result = data;
        } else if (token.type === TOK_IDENTIFIER) {
            if (result instanceof DataGroup && result.$type === 'object') {
                //@ts-ignore
                if (result.$containsDataNode(token.value) && result.$getDataNode(token.value).$value !== null) {
                    result = result.$getDataNode(token.value);
                } else if (create) {
                    const nextToken = i < tokens.length - 1 ? tokens[i + 1] : null;
                    const toCreate = createIntermediateNode(token, nextToken, create);
                    result.$addDataNode(token.value, toCreate);
                    result = toCreate;
                } else {
                    result = undefined;
                }
            } else {
                throw new Error(`Looking for ${token.value} in ${result.$value}`);
            }
        } else if (token.type === TOK_BRACKET) {
            if (result instanceof DataGroup && result.$type === 'array') {
                const index = token.value as number;
                if (index < result.$length) {
                    //@ts-ignore
                    result = result.$getDataNode(index);
                } else if (create) {
                    const nextToken = i < tokens.length - 1 ? tokens[i + 1] : null;
                    const toCreate = createIntermediateNode(token, nextToken, create);
                    result.$addDataNode(index, toCreate);
                    result = toCreate;
                } else {
                    result = undefined;
                }
            } else {
                throw new Error(`Looking for index ${token.value} in non array${result.$value}`);
            }
        }
        i += 1;
    }
    return result;
};