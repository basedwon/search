const { _, log } = require('basd')
const Registry = require('@basd/registry')
const SearchTokenizer = require('./search-tokenizer')
const SearchParser = require('./search-parser')
const SearchInterpreter = require('./search-interpreter')
const SearchFactory = require('./search-factory')

/**
 * @class Search
 */
class Search {
  static get Factory() { return SearchFactory }
  static get Tokenizer() { return SearchTokenizer }
  static get Parser() { return SearchParser }
  static get Interpreter() { return SearchInterpreter }
  /**
   * @constructor
   * @param {Object} opts - Options for Search
   */
  constructor(opts = {}) {
    _.objProp(this, 'registry', Registry.get(opts))
    _.objProp(this, 'factory', new this.constructor.Factory(this.registry))
    _.objProp(this, 'tokenizer', this.factory.createTokenizer())
  }

  /**
   * Creates an evaluator function based on the needle (query string)
   * @param {string} needle - Query string
   * @returns {Function} - Evaluator function
   */
  evaluator(needle) {
    const tokens = this.tokenizer.tokenize(needle)
    const parser = this.factory.createParser(tokens)
    const ast = parser.parse()
    const interpreter = this.factory.createInterpreter(ast)
    return (haystack) => interpreter.interpret(haystack)
  }

  /**
   * Evaluates a query string against a text string
   * @param {string} needle - Query string
   * @param {string} haystack - Text string
   * @returns {boolean} - True if the query matches, false otherwise
   */
  evaluate(needle, haystack) {
    return this.evaluator(needle)(haystack)
  }
}

module.exports = Search
