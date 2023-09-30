const { _, log } = require('basd')
const SearchNormalizer = require('./search-normalizer')

/**
 * @class SearchInterpreter
 */
class SearchInterpreter {
  /**
   * @constructor
   * @param {Object} ast - The AST to interpret
   */
  constructor(ast) {
    this.ast = ast
  }

  /**
   * Interprets the AST against a given text
   * @param {string} text - Text to search
   * @returns {boolean}
   */
  interpret(text) {
    if (_.isNil(this.ast) || _.isNil(this.ast?.type)) {
      // console.error('Invalid AST provided.')
      return false
    }
    const normalized = SearchNormalizer.normalize(text)
    return this.evaluateNode(this.ast, normalized)
  }

  /**
   * Evaluates a node in the AST
   * @private
   * @param {Object} node - The AST node to evaluate
   * @param {string} text - The text to search
   * @returns {boolean}
   */
  evaluateNode(node, text) {
    switch (node?.type) {
      case 'WORD':
        return text.includes(node.value)
      case 'UNARY':
        return this.evaluateUnary(node, text)
      case 'BINARY':
        return this.evaluateBinary(node, text)
      default:
        throw new Error(`Unknown node type: ${node?.type}`)
    }
  }

  /**
   * Evaluates a binary operation node
   * @private
   * @param {Object} node - The AST node representing a binary operation
   * @param {string} text - The text to search
   * @returns {boolean}
   */
  evaluateBinary(node, text) {
    const leftResult = this.evaluateNode(node.left, text)
    const rightResult = this.evaluateNode(node.right, text)
    switch (node.operator.value) {
      case 'AND':
        return leftResult && rightResult
      case 'OR':
        return leftResult || rightResult
      default:
        throw new Error(`Unknown operator: ${node.operator.value}`)
    }
  }

  /**
   * Evaluates a unary operation node
   * @private
   * @param {Object} node - The AST node representing a unary operation
   * @param {string} text - The text to search
   * @returns {boolean}
   */
  evaluateUnary(node, text) {
    switch (node.operator.value) {
      case 'NOT':
        return !this.evaluateNode(node.operand, text)
      default:
        throw new Error(`Unknown operator: ${node.operator.value}`)
    }
  }
}

module.exports = SearchInterpreter
