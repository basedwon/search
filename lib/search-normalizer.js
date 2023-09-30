const { _, log } = require('basd')

/**
 * @class SearchNormalizer
 */
class SearchNormalizer {
  /**
   * Normalizes a text string
   * @param {string} text - Text to normalize
   * @returns {string}
   */
  static normalize(text) {
    return String(text)
      .toUpperCase()
      .replace(/[^\w\s&|()"]/g, '') // Remove punctuation except ", &, |, (, and )
      .replace(/&/g, ' AND ') // Replace "&" with " AND "
      .replace(/\|/g, ' OR ') // Replace "|" with " OR "
      .replace(/\s+/g, ' ') // Remove multiple spaces
      .trim() // Remove leading and trailing spaces
  }
}

module.exports = SearchNormalizer
