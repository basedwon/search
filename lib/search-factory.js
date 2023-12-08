const { _, log } = require('basd')
const SearchTokenizer = require('./search-tokenizer')
const SearchParser = require('./search-parser')
const SearchInterpreter = require('./search-interpreter')

/**
 * SearchFactory Class
 * @class
 */
class SearchFactory {
  /**
   * @constructor
   * @param {Object} registry - The registry for storing class references
   */
  constructor(registry) {
    this.registry = registry
    this.registry.setMany({
      tokenizer: SearchTokenizer,
      parser: SearchParser,
      interpreter: SearchInterpreter,
    })
  }

  /**
   * Creates an instance of the SearchTokenizer class
   * @returns {SearchTokenizer} - Instance of SearchTokenizer
   */
  createTokenizer(...args) {
    return this.registry.createInstance('tokenizer', args, SearchTokenizer)
  }

  /**
   * Creates an instance of the SearchParser class
   * @returns {SearchParser} - Instance of SearchParser
   */
  createParser(...args) {
    return this.registry.createInstance('parser', args, SearchParser)
  }

  /**
   * Creates an instance of the SearchInterpreter class
   * @returns {SearchInterpreter} - Instance of SearchInterpreter
   */
  createInterpreter(...args) {
    return this.registry.createInstance('interpreter', args, SearchInterpreter)
  }
}

module.exports = SearchFactory
