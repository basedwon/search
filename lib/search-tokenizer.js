const { _, log } = require('basd')
const SearchNormalizer = require('./search-normalizer')

/**
 * @class SearchTokenizer
 */
class SearchTokenizer {
  /**
   * @constructor
   */
  constructor() {
    this.operators = {
      AND: 'AND',
      OR: 'OR',
      NOT: 'NOT',
    }
  }

  /**
   * Tokenizes a query string
   * @param {string} query - Query to tokenize
   * @returns {Array} - List of tokens
   */
  tokenize(query) {
    const normalizedQuery = SearchNormalizer.normalize(query)
    const tokens = []
    let buffer = ''
    let inQuotes = false
    for (let ii = 0; ii < normalizedQuery.length; ii++) {
      const char = normalizedQuery[ii]
      if (char === '"') {
        [inQuotes, buffer] = this.handleQuotes(inQuotes, buffer, tokens)
      } else if (inQuotes) {
        buffer += char
      } else {
        buffer = this.handleCharacters(char, buffer, tokens)
      }
    }
    this.flushBuffer(buffer, tokens)
    return tokens
  }

  /**
   * Handles quote characters in the query
   * @private
   * @param {boolean} inQuotes - Whether currently inside quotes
   * @param {string} buffer - The current buffer of characters
   * @param {Array} tokens - The list of tokens
   * @returns {Array} - Updated state [inQuotes, buffer]
   */
  handleQuotes(inQuotes, buffer, tokens) {
    if (!inQuotes) {
      return [true, buffer]
    } else {
      tokens.push({ type: 'WORD', value: buffer })
      return [false, '']
    }
  }

  /**
   * Handles regular characters in the query
   * @private
   * @param {string} char - The current character
   * @param {string} buffer - The current buffer of characters
   * @param {Array} tokens - The list of tokens
   * @returns {string} - Updated buffer
   */
  handleCharacters(char, buffer, tokens) {
    if (char === ' ' || char === '(' || char === ')') {
      this.flushBuffer(buffer, tokens)
      if (char === '(') tokens.push({ type: 'LEFT_PAREN', value: char })
      if (char === ')') tokens.push({ type: 'RIGHT_PAREN', value: char })
      return ''
    } else {
      return buffer + char
    }
  }

  /**
   * Flushes the current buffer into tokens
   * @private
   * @param {string} buffer - The current buffer of characters
   * @param {Array} tokens - The list of tokens
   */
  flushBuffer(buffer, tokens) {
    if (buffer.length > 0) {
      const tokenType = this.operators[buffer] ? 'OPERATOR' : 'WORD'
      const tokenValue = this.operators[buffer] || buffer
      tokens.push({ type: tokenType, value: tokenValue })
    }
  }
}

module.exports = SearchTokenizer
