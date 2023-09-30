const Registry = require('@basd/registry')
const Search = require('../lib/search')
const SearchFactory = require('../lib/search-factory')
const SearchTokenizer = require('../lib/search-tokenizer')
const SearchParser = require('../lib/search-parser')
const SearchInterpreter = require('../lib/search-interpreter')
const SearchNormalizer = require('../lib/search-normalizer')

describe('Normalizer', () => {
  it('should normalize a string', () => {
    expect(SearchNormalizer.normalize('test & check')).to.equal('TEST AND CHECK')
  })

  it('should normalize text by converting to uppercase', () => {
    expect(SearchNormalizer.normalize('apple')).to.equal('APPLE')
  })

  it('should replace & and | with AND and OR', () => {
    expect(SearchNormalizer.normalize('apple & orange | banana'))
      .to.equal('APPLE AND ORANGE OR BANANA')
  })

  it('should remove all punctuation except &, |, (, and )', () => {
    expect(SearchNormalizer.normalize('apple, orange! & banana; (grape)'))
      .to.equal('APPLE ORANGE AND BANANA (GRAPE)')
  })

  it('should normalize a lowercase string to uppercase', () => {
    expect(SearchNormalizer.normalize('test')).to.equal('TEST')
  })

  it('should replace "&" with " AND "', () => {
    expect(SearchNormalizer.normalize('A & B')).to.equal('A AND B')
  })

  it('should replace "|" with " OR "', () => {
    expect(SearchNormalizer.normalize('A | B')).to.equal('A OR B')
  })

  it('should remove extra spaces', () => {
    expect(SearchNormalizer.normalize(' A  B ')).to.equal('A B')
  })
})

describe('Tokenizer', () => {
  const tokenizer = new SearchTokenizer()
  
  it('should tokenize a simple query', () => {
    const tokens = tokenizer.tokenize('apple AND orange')
    expect(tokens).to.deep.equal([
      { type: 'WORD', value: 'APPLE' },
      { type: 'OPERATOR', value: 'AND' },
      { type: 'WORD', value: 'ORANGE' }
    ])
  })
  
  it('should tokenize query with parentheses', () => {
    const tokens = tokenizer.tokenize('apple AND (orange OR banana)')
    expect(tokens).to.deep.equal([
      { type: 'WORD', value: 'APPLE' },
      { type: 'OPERATOR', value: 'AND' },
      { type: 'LEFT_PAREN', value: '(' },
      { type: 'WORD', value: 'ORANGE' },
      { type: 'OPERATOR', value: 'OR' },
      { type: 'WORD', value: 'BANANA' },
      { type: 'RIGHT_PAREN', value: ')' }
    ])
  })
  
  it('should tokenize single-word query', () => {
    const tokens = tokenizer.tokenize('apple')
    expect(tokens).to.deep.equal([
      { type: 'WORD', value: 'APPLE' }
    ])
  })

  it('should tokenize query with explicit AND operator', () => {
    const tokens = tokenizer.tokenize('apple AND banana')
    expect(tokens).to.deep.equal([
      { type: 'WORD', value: 'APPLE' },
      { type: 'OPERATOR', value: 'AND' },
      { type: 'WORD', value: 'BANANA' }
    ])
  })

  it('should tokenize query with explicit OR operator', () => {
    const tokens = tokenizer.tokenize('apple OR banana')
    expect(tokens).to.deep.equal([
      { type: 'WORD', value: 'APPLE' },
      { type: 'OPERATOR', value: 'OR' },
      { type: 'WORD', value: 'BANANA' }
    ])
  })

  it('should tokenize query with mixed AND and OR operators', () => {
    const tokens = tokenizer.tokenize('apple AND banana OR orange')
    expect(tokens).to.deep.equal([
      { type: 'WORD', value: 'APPLE' },
      { type: 'OPERATOR', value: 'AND' },
      { type: 'WORD', value: 'BANANA' },
      { type: 'OPERATOR', value: 'OR' },
      { type: 'WORD', value: 'ORANGE' }
    ])
  })

  it('should tokenize query with parentheses', () => {
    const tokens = tokenizer.tokenize('(apple AND banana) OR orange')
    expect(tokens).to.deep.equal([
      { type: 'LEFT_PAREN', value: '(' },
      { type: 'WORD', value: 'APPLE' },
      { type: 'OPERATOR', value: 'AND' },
      { type: 'WORD', value: 'BANANA' },
      { type: 'RIGHT_PAREN', value: ')' },
      { type: 'OPERATOR', value: 'OR' },
      { type: 'WORD', value: 'ORANGE' }
    ])
  })

  it('should tokenize query with nested parentheses', () => {
    const tokens = tokenizer.tokenize('(apple AND (banana OR orange))')
    expect(tokens).to.deep.equal([
      { type: 'LEFT_PAREN', value: '(' },
      { type: 'WORD', value: 'APPLE' },
      { type: 'OPERATOR', value: 'AND' },
      { type: 'LEFT_PAREN', value: '(' },
      { type: 'WORD', value: 'BANANA' },
      { type: 'OPERATOR', value: 'OR' },
      { type: 'WORD', value: 'ORANGE' },
      { type: 'RIGHT_PAREN', value: ')' },
      { type: 'RIGHT_PAREN', value: ')' }
    ])
  })

  it('should tokenize query with symbols for AND and OR', () => {
    const tokens = tokenizer.tokenize('apple & banana | orange')
    expect(tokens).to.deep.equal([
      { type: 'WORD', value: 'APPLE' },
      { type: 'OPERATOR', value: 'AND' },
      { type: 'WORD', value: 'BANANA' },
      { type: 'OPERATOR', value: 'OR' },
      { type: 'WORD', value: 'ORANGE' }
    ])
  })

  it('should tokenize words', () => {
    const tokens = tokenizer.tokenize('TEST')
    expect(tokens).to.deep.equal([{ type: 'WORD', value: 'TEST' }])
  })

  it('should tokenize operators', () => {
    const tokens = tokenizer.tokenize('AND OR NOT')
    expect(tokens).to.deep.equal([
      { type: 'OPERATOR', value: 'AND' },
      { type: 'OPERATOR', value: 'OR' },
      { type: 'OPERATOR', value: 'NOT' }
    ])
  })

  it('should tokenize parentheses', () => {
    const tokens = tokenizer.tokenize('( )')
    expect(tokens).to.deep.equal([
      { type: 'LEFT_PAREN', value: '(' },
      { type: 'RIGHT_PAREN', value: ')' }
    ])
  })

  it('should tokenize a normalized string', () => {
    // const tokenizer = new SearchTokenizer()
    const tokens = tokenizer.tokenize('TEST AND CHECK')
    expect(tokens).to.deep.equal([{ type: 'WORD', value: 'TEST' }, { type: 'OPERATOR', value: 'AND' }, { type: 'WORD', value: 'CHECK' }])
  })
})

describe('Parser', () => {
  it('should parse AND operator', () => {
    const tokens = [
      { type: 'WORD', value: 'APPLE' },
      { type: 'OPERATOR', value: 'AND' },
      { type: 'WORD', value: 'ORANGE' }
    ]
    const parser = new SearchParser(tokens)
    const ast = parser.parse()
    expect(ast).to.deep.equal({
      type: 'BINARY',
      operator: { type: 'OPERATOR', value: 'AND' },
      left: { type: 'WORD', value: 'APPLE' },
      right: { type: 'WORD', value: 'ORANGE' }
    })
  })
  
  it('should parse complex expression with parentheses', () => {
    const tokens = new SearchTokenizer().tokenize('apple AND (orange OR banana)')
    const parser = new SearchParser(tokens)
    const ast = parser.parse()
    expect(ast).to.deep.equal({
      type: 'BINARY',
      operator: { type: 'OPERATOR', value: 'AND' },
      left: { type: 'WORD', value: 'APPLE' },
      right: {
        type: 'BINARY',
        operator: { type: 'OPERATOR', value: 'OR' },
        left: { type: 'WORD', value: 'ORANGE' },
        right: { type: 'WORD', value: 'BANANA' }
      }
    })
  })

  it('should parse OR operator', () => {
    const tokens = [
      { type: 'WORD', value: 'APPLE' },
      { type: 'OPERATOR', value: 'OR' },
      { type: 'WORD', value: 'ORANGE' }
    ]
    const parser = new SearchParser(tokens)
    const ast = parser.parse()
    expect(ast).to.deep.equal({
      type: 'BINARY',
      operator: { type: 'OPERATOR', value: 'OR' },
      left: { type: 'WORD', value: 'APPLE' },
      right: { type: 'WORD', value: 'ORANGE' }
    })
  })

  it('should handle implicit AND between terms', () => {
    const tokens = new SearchTokenizer().tokenize('apple orange')
    const parser = new SearchParser(tokens)
    const ast = parser.parse()
    expect(ast).to.deep.equal({
      type: 'BINARY',
      operator: { type: 'OPERATOR', value: 'AND' },
      left: { type: 'WORD', value: 'APPLE' },
      right: { type: 'WORD', value: 'ORANGE' }
    })
  })

  it('should handle nested parentheses', () => {
    const tokens = new SearchTokenizer().tokenize('apple AND (orange OR (banana AND grape))')
    const parser = new SearchParser(tokens)
    const ast = parser.parse()
    expect(ast).to.deep.equal({
      type: 'BINARY',
      operator: { type: 'OPERATOR', value: 'AND' },
      left: { type: 'WORD', value: 'APPLE' },
      right: {
        type: 'BINARY',
        operator: { type: 'OPERATOR', value: 'OR' },
        left: { type: 'WORD', value: 'ORANGE' },
        right: {
          type: 'BINARY',
          operator: { type: 'OPERATOR', value: 'AND' },
          left: { type: 'WORD', value: 'BANANA' },
          right: { type: 'WORD', value: 'GRAPE' }
        }
      }
    })
  })

  it('should throw an error for unmatched parentheses', () => {
    const tokens = [
      { type: 'LEFT_PAREN', value: '(' },
      { type: 'WORD', value: 'APPLE' }
    ]
    const parser = new SearchParser(tokens)
    expect(() => parser.parse()).to.throw('Expected closing parenthesis')
  })

  it('should throw an error for unexpected token', () => {
    const tokens = [{ type: 'OPERATOR', value: 'AND' }]
    const parser = new SearchParser(tokens)
    expect(() => parser.parse()).to.throw('Unexpected token')
  })

  it('should parse "AND" operations', () => {
    const tokens = [
      { type: 'WORD', value: 'TEST' },
      { type: 'OPERATOR', value: 'AND' },
      { type: 'WORD', value: 'CHECK' }
    ]
    const parser = new SearchParser(tokens)
    const ast = parser.parse()
    expect(ast).to.deep.equal({
      type: 'BINARY',
      operator: { type: 'OPERATOR', value: 'AND' },
      left: { type: 'WORD', value: 'TEST' },
      right: { type: 'WORD', value: 'CHECK' }
    })
  })

  it('should parse a token array into an AST', () => {
    const tokens = [{ type: 'WORD', value: 'TEST' }, { type: 'OPERATOR', value: 'AND' }, { type: 'WORD', value: 'CHECK' }]
    const parser = new SearchParser(tokens)
    const ast = parser.parse()
    expect(ast).to.deep.equal({
      type: 'BINARY',
      operator: { type: 'OPERATOR', value: 'AND' },
      left: { type: 'WORD', value: 'TEST' },
      right: { type: 'WORD', value: 'CHECK' }
    })
  })
})

describe('Interpreter', () => {
  it('should interpret an AST', () => {
    const ast = {
      type: 'BINARY',
      operator: { type: 'OPERATOR', value: 'AND' },
      left: { type: 'WORD', value: 'TEST' },
      right: { type: 'WORD', value: 'CHECK' }
    }
    const interpreter = new SearchInterpreter(ast)
    expect(interpreter.interpret('This is a test and a check')).to.equal(true)
  })

  it('should evaluate "AND" operations', () => {
    // Similar test case for evaluating "AND"
  })

  it('should evaluate "OR" operations', () => {
    // Similar test case for evaluating "OR"
  })

  it('should evaluate "NOT" operations', () => {
    // Similar test case for evaluating "NOT"
  })

  it('should handle nested operations', () => {
    // Test case for evaluating nested operations
  })
})

describe('Interpreter - Query Matrix', () => {
  const datas = [
    `orange juice`,
    `apple sauce`,
    `apple juice AND orange`,
    `grape AND plum`,
    `apple OR banana`,
    `apple AND banana AND grape`,
    `apple AND orange OR grape`,
    `orange`
  ]
  const queries = [
    `apple`,
    `"apple sauce" | bbq sauce`,
    `apple AND orange`,
    `apple AND orange OR grape`,
    `apple AND (orange OR grape)`,
    `"apple AND banana"`,
    `apple AND banana AND grape`,
    `apple AND orange AND (grape OR plum)`
  ]

  let results = [
    [0, 1, 1, 0, 1, 1, 1, 0], // Searching for `apple`
    [0, 1, 0, 0, 0, 0, 0, 0], // Searching for exact `"apple sauce"` or `bbq sauce`
    [0, 0, 1, 0, 0, 0, 1, 0], // Searching for `apple AND orange`
    [0, 0, 1, 1, 0, 1, 1, 0], // Searching for `apple AND orange OR grape`
    [0, 0, 1, 0, 0, 1, 1, 0], // Searching for `apple AND (orange OR grape)`
    [0, 0, 0, 0, 0, 1, 0, 0], // Searching for the exact phrase `"apple AND banana"`
    [0, 0, 0, 0, 0, 1, 0, 0], // Searching for `apple AND banana AND grape`
    [0, 0, 0, 0, 0, 0, 1, 0]  // Searching for `apple AND orange AND (grape OR plum)`
  ]
  const tokenizer = new SearchTokenizer()
  results.map((resultArray, queryIndex) => {
    const query = queries[queryIndex]
    resultArray.map((expected, dataIndex) => {
      expected = !!expected
      const data = datas[dataIndex]
      const spacer = expected ? ' ' : ''
      it(`should return ${expected}${spacer} - query: ${query} - data: ${data}`, () => {
        const tokens = tokenizer.tokenize(query)
        const parser = new SearchParser(tokens)
        const ast = parser.parse()
        const interpreter = new SearchInterpreter(ast)
        const result = interpreter.interpret(data)
        expect(result).to.equal(expected)
      })
    })
  })
})

describe('Interpreter AST input', () => {
  it('should interpret simple AND expression', () => {
    const ast = {
      type: 'BINARY',
      operator: { type: 'OPERATOR', value: 'AND' },
      left: { type: 'WORD', value: 'APPLE' },
      right: { type: 'WORD', value: 'ORANGE' }
    }
    const interpreter = new SearchInterpreter(ast)
    expect(interpreter.interpret('apple orange')).to.equal(true)
    expect(interpreter.interpret('apple banana')).to.equal(false)
  })

  it('should interpret simple OR expression', () => {
    const ast = {
      type: 'BINARY',
      operator: { type: 'OPERATOR', value: 'OR' },
      left: { type: 'WORD', value: 'APPLE' },
      right: { type: 'WORD', value: 'ORANGE' }
    }
    const interpreter = new SearchInterpreter(ast)
    expect(interpreter.interpret('apple banana')).to.equal(true)
    expect(interpreter.interpret('pear banana')).to.equal(false)
  })

  it('should interpret complex expression with parentheses', () => {
    const ast = {
      type: 'BINARY',
      operator: { type: 'OPERATOR', value: 'AND' },
      left: { type: 'WORD', value: 'APPLE' },
      right: {
        type: 'BINARY',
        operator: { type: 'OPERATOR', value: 'OR' },
        left: { type: 'WORD', value: 'ORANGE' },
        right: { type: 'WORD', value: 'BANANA' }
      }
    }
    const interpreter = new SearchInterpreter(ast)
    expect(interpreter.interpret('apple orange')).to.equal(true)
    expect(interpreter.interpret('apple banana')).to.equal(true)
    expect(interpreter.interpret('apple pear')).to.equal(false)
  })

  it('should interpret implicit AND expression', () => {
    const ast = {
      type: 'BINARY',
      operator: { type: 'OPERATOR', value: 'AND' },
      left: { type: 'WORD', value: 'APPLE' },
      right: { type: 'WORD', value: 'ORANGE' }
    }
    const interpreter = new SearchInterpreter(ast)
    expect(interpreter.interpret('apple orange')).to.equal(true)
    expect(interpreter.interpret('orange apple')).to.equal(true)
    expect(interpreter.interpret('apple pear')).to.equal(false)
  })

  it('should interpret nested parentheses', () => {
    const ast = {
      type: 'BINARY',
      operator: { type: 'OPERATOR', value: 'OR' },
      left: {
        type: 'BINARY',
        operator: { type: 'OPERATOR', value: 'AND' },
        left: { type: 'WORD', value: 'APPLE' },
        right: { type: 'WORD', value: 'BANANA' }
      },
      right: {
        type: 'BINARY',
        operator: { type: 'OPERATOR', value: 'AND' },
        left: { type: 'WORD', value: 'PEAR' },
        right: { type: 'WORD', value: 'PLUM' }
      }
    }
    const interpreter = new SearchInterpreter(ast)
    expect(interpreter.interpret('apple banana')).to.equal(true)
    expect(interpreter.interpret('pear plum')).to.equal(true)
    expect(interpreter.interpret('apple plum')).to.equal(false)
  })

  it('should interpret quotes as exact match', () => {
    const ast = {
      type: 'BINARY',
      operator: { type: 'OPERATOR', value: 'OR' },
      left: { type: 'WORD', value: 'APPLE SAUCE' },
      right: { type: 'WORD', value: 'BANANA' }
    }
    const interpreter = new SearchInterpreter(ast)
    expect(interpreter.interpret('apple sauce')).to.equal(true)
    expect(interpreter.interpret('apple banana')).to.equal(true)
    expect(interpreter.interpret('banana')).to.equal(true)
    expect(interpreter.interpret('apple juice sauce')).to.equal(false)
  })

  it('should interpret NOT operator', () => {
    const ast = {
      type: 'UNARY',
      operator: { type: 'OPERATOR', value: 'NOT' },
      operand: { type: 'WORD', value: 'APPLE' }
    }
    const interpreter = new SearchInterpreter(ast)
    expect(interpreter.interpret('orange')).to.equal(true)
    expect(interpreter.interpret('apple')).to.equal(false)
  })
})

describe('Interpreter - Edge Cases and Invalid Expressions', () => {
  it('should handle empty query', () => {
    const ast = null
    const interpreter = new SearchInterpreter(ast)
    expect(interpreter.interpret('apple')).to.equal(false)
  })

  it('should handle query with only whitespace', () => {
    const ast = { type: 'WORD', value: ' ' }
    const interpreter = new SearchInterpreter(ast)
    expect(interpreter.interpret('apple')).to.equal(false)
  })

  it('should handle invalid AST type', () => {
    const ast = { type: 'INVALID_TYPE', value: 'APPLE' }
    const interpreter = new SearchInterpreter(ast)
    expect(() => interpreter.interpret('apple')).to.throw(`Unknown node type: INVALID_TYPE`)
  })

  it('should handle incomplete binary expression', () => {
    const ast = {
      type: 'BINARY',
      operator: { type: 'OPERATOR', value: 'AND' },
      left: { type: 'WORD', value: 'APPLE' }
      // Missing right operand
    }
    const interpreter = new SearchInterpreter(ast)
    expect(() => interpreter.interpret('apple')).to.throw(`Unknown node type: undefined`)
  })

  it('should handle nested empty expressions', () => {
    const ast = {
      type: 'BINARY',
      operator: { type: 'OPERATOR', value: 'AND' },
      left: { type: 'WORD', value: 'APPLE' },
      right: {
        type: 'BINARY',
        operator: { type: 'OPERATOR', value: 'OR' }
        // Missing both left and right operands
      }
    }
    const interpreter = new SearchInterpreter(ast)
    expect(() => interpreter.interpret('apple')).to.throw(`Unknown node type: undefined`)
  })

  it('should handle invalid unary expression', () => {
    const ast = {
      type: 'UNARY',
      operator: { type: 'OPERATOR', value: 'NOT' }
      // Missing right operand
    }
    const interpreter = new SearchInterpreter(ast)
    expect(() => interpreter.interpret('apple')).to.throw(`Unknown node type: undefined`)
  })
})

describe('SearchFactory', () => {
  it('should create instances of tokenizer, parser, and interpreter', () => {
    const registry = new Registry()
    const factory = new SearchFactory(registry)
    expect(factory.createTokenizer()).to.be.instanceof(SearchTokenizer)
    expect(factory.createParser()).to.be.instanceof(SearchParser)
    expect(factory.createInterpreter()).to.be.instanceof(SearchInterpreter)
  })
})

describe('Search', () => {
  let search

  beforeEach(() => search = new Search())

  it('should evaluate a simple query', () => {
    expect(search.evaluate('test', 'This is a test')).to.equal(true)
  })

  it('should evaluate complex queries', () => {
    expect(search.evaluate('test AND (pass OR fail)', 'This is a test that will pass')).to.equal(true)
  })

  it('should return false for failing queries', () => {
    expect(search.evaluate('test AND fail', 'This is a test that will pass')).to.equal(false)
  })

  it('should evaluate a search query against a string', () => {
    expect(search.evaluate('test AND check', 'This is a test and a check')).to.equal(true)
  })
})
