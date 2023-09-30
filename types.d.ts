declare module '@basd/search' {
  export class SearchFactory {
    constructor(registry: any)
    createTokenizer(...args: any[]): any
    createParser(...args: any[]): any
    createInterpreter(...args: any[]): any
  }

  export class SearchInterpreter {
    constructor(ast: any)
    interpret(text: string): boolean
  }

  export class SearchNormalizer {
    static normalize(text: string): string
  }

  export class SearchParser {
    constructor(tokens: Token[])
    parse(): ASTNode
  }

  export class SearchTokenizer {
    constructor()
    tokenize(query: string): Token[]
  }

  export class Search {
    static Factory: typeof SearchFactory
    static Tokenizer: typeof SearchTokenizer
    static Parser: typeof SearchParser
    static Interpreter: typeof SearchInterpreter
    constructor(opts?: Record<string, any>)
    evaluator(needle: string): (haystack: string) => boolean
    evaluate(needle: string, haystack: string): boolean
  }

  interface Token {
    type: 'WORD' | 'OPERATOR' | 'LEFT_PAREN' | 'RIGHT_PAREN'
    value: string
  }

  interface ASTNode {
    type: 'WORD' | 'UNARY' | 'BINARY'
    operator?: Token
    left?: ASTNode
    right?: ASTNode
    operand?: ASTNode
  }
}
