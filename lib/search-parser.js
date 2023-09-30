const { _, log } = require('basd')

/**
 * @class SearchParser
 */
class SearchParser {
  /**
   * @constructor
   * @param {Array} tokens - Tokens to parse
   */
  constructor(tokens) {
    this.tokens = tokens
    this.position = 0
  }

  /**
   * Initiates the parsing process
   * @returns {Object} - AST
   */
  parse() {
    return this.parseOr()
  }

  /**
   * Parses 'OR' expressions in the token stream
   * @private
   * @returns {Object} - AST node
   */
  parseOr() {
    let left = this.parseAnd()
    while (this.current && this.current.value === 'OR') {
      const operator = this.current
      this.position++
      const right = this.parseAnd()
      left = { type: 'BINARY', operator, left, right }
    }
    return left
  }

  /**
   * Parses 'AND' expressions in the token stream
   * @private
   * @returns {Object} - AST node
   */
  parseAnd() {
    let left = this.parseTerm()
    while (
      this.current && (
        this.current.type === 'WORD' || 
        this.current.value === 'AND' || 
        this.current.type === 'LEFT_PAREN')
      ) {
      if (this.current.value === 'AND') {
        this.position++ // consume explicit AND operator
      }
      // handle implicit AND between two terms
      else if (this.current.type === 'WORD' || this.current.type === 'LEFT_PAREN') {
        // no need to increase position, let the next term handle it
      } else {
        throw new Error('Unexpected token in parseAnd')
      }
      const right = this.parseTerm()
      const operator = { type: 'OPERATOR', value: 'AND' }
      left = { type: 'BINARY', operator, left, right }
    }
    return left
  }

  /**
   * Parses 'NOT' expressions in the token stream
   * @private
   * @returns {Object} - AST node
   */
  parseNot() {
    if (this.current.value === 'NOT') {
      const operator = this.current
      this.position++
      const operand = this.parseTerm()
      return { type: 'UNARY', operator, operand }
    }
    return this.parseTerm()
  }

  /**
   * Parses a term in the token stream
   * @private
   * @returns {Object} - AST node
   */
  parseTerm() {
    if (this.current.type === 'LEFT_PAREN') {
      this.position++
      const expression = this.parseOr()
      if (this.current.type !== 'RIGHT_PAREN') {
        throw new Error('Expected closing parenthesis')
      }
      this.position++
      return expression
    } else if (this.current.value === 'NOT') {
      return this.parseNot()
    } else if (this.current.type === 'WORD') {
      const term = this.current
      this.position++
      return term
    } else {
      throw new Error(`Unexpected token: ${JSON.stringify(this.current)}`)
    }
  }

  /**
   * Gets the current token based on the position in the token stream
   * @private
   * @returns {Object|undefined} - Current token or undefined if the end of the token stream is reached
   */
  get current() {
    return this.tokens[this.position] || {}
  }
}

module.exports = SearchParser
