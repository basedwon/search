# Search

[![npm](https://img.shields.io/npm/v/@basd/search?style=flat&logo=npm)](https://www.npmjs.com/package/@basd/search)
[![pipeline](https://gitlab.com/frenware/framework/plaindb/search/badges/master/pipeline.svg)](https://gitlab.com/frenware/framework/plaindb/search/-/pipelines)
[![license](https://img.shields.io/npm/l/@basd/search)](https://gitlab.com/frenware/framework/plaindb/search/-/blob/master/LICENSE)
[![downloads](https://img.shields.io/npm/dw/@basd/search)](https://www.npmjs.com/package/@basd/search) 

[![Gitlab](https://img.shields.io/badge/Gitlab%20-%20?logo=gitlab&color=%23383a40)](https://gitlab.com/frenware/framework/plaindb/search)
[![Github](https://img.shields.io/badge/Github%20-%20?logo=github&color=%23383a40)](https://github.com/basedwon/search)
[![Twitter](https://img.shields.io/badge/@basdwon%20-%20?logo=twitter&color=%23383a40)](https://twitter.com/basdwon)
[![Discord](https://img.shields.io/badge/Basedwon%20-%20?logo=discord&color=%23383a40)](https://discordapp.com/users/basedwon)

A powerful and flexible text search library for JavaScript that enables you to build a simple text search engine. It provides a set of classes to tokenize, parse, and interpret queries using a binary AST (Abstract Syntax Tree). The library supports various grouping operators (and/or/&/|) and any degree of parenthesis nesting.

## Features
- Tokenization of search queries
- Parsing to Abstract Syntax Trees (AST)
- Interpretation to evaluate search queries against text
- Normalization of text and query strings
- Abstract factory for easy extension

## Installation

Install the package with:

```bash
npm install @basd/search
```

## Usage

First, import the `Search` library.

```js
import Search from '@basd/search'
```
or
```js
const Search = require('@basd/search')
```

## Quick Start

Here's how to create a simple search evaluator and use it.

```js
const Search = require('@basd/search')

const search = new Search()
const evaluator = search.evaluator('apple AND orange')

const result = evaluator('I have an apple and an orange.')
// Returns true
```

Here's a basic example of how you can use `@basd/search` to perform a text search:

```js
const { Tokenizer, Parser, Interpreter } = require('@basd/search')

const query = 'apple AND orange OR pear'
const tokenizer = new Tokenizer()
const tokens = tokenizer.tokenize(query)

const parser = new Parser(tokens)
const ast = parser.parse()

const interpreter = new Interpreter(ast)
const result = interpreter.interpret('apple orange') // true
```

## Documentation

- [API Reference](/docs/api.md)

## API Reference

### Classes

#### `SearchFactory`
Factory class to produce instances of Tokenizer, Parser, and Interpreter.

```js
const factory = new SearchFactory(registry)
```

##### Methods
- `createTokenizer(...args)`: Creates a `SearchTokenizer` instance.
- `createParser(...args)`: Creates a `SearchParser` instance.
- `createInterpreter(...args)`: Creates a `SearchInterpreter` instance.

#### `SearchNormalizer`
Normalizes text to be used in tokenization and interpretation.

```js
const normalizedText = SearchNormalizer.normalize('some text')
```

#### `SearchTokenizer`
Tokenizes the normalized query.

```js
const tokenizer = new SearchTokenizer()
const tokens = tokenizer.tokenize('apple AND orange')
```

#### `SearchParser`
Parses the tokens into an AST.

```js
const parser = new SearchParser(tokens)
const ast = parser.parse()
```

#### `SearchInterpreter`
Interprets the AST against a given text.

```js
const interpreter = new SearchInterpreter(ast)
const result = interpreter.interpret('I have an apple.')
```

#### `Search`
The main class that combines all the functionalities.

```js
const search = new Search()
```

##### Methods
- `evaluator(needle)`: Returns an evaluator function for a given search query.
- `evaluate(needle, haystack)`: Evaluates a search query against a given text.

## Extending the Library

The library is designed to be easily extendable. You can extend `SearchTokenizer`, `SearchParser`, and `SearchInterpreter` to add additional functionalities.

### Classes

#### `TextNormalizer`

Normalizes text by removing punctuations, converting to uppercase, and replacing multiple spaces with a single space.

#### `Tokenizer`

Tokenizes a query into distinct elements such as words, operators, and parentheses.

#### `Parser`

Takes the tokens and turns them into a binary AST.

#### `Interpreter`

Takes the AST and matches a given text string against it.

## API Reference

### `Tokenizer.tokenize(query: string): Token[]`

Takes a query string and returns an array of tokens.

### `Parser.parse(): ASTNode`

Takes an array of tokens and returns a binary AST.

### `Interpreter.interpret(data: string): boolean`

Takes a string of text and returns a boolean indicating whether it matches the AST.

## Tests

In order to run the test suite, simply clone the repository and install its dependencies:

```bash
git clone https://gitlab.com/frenware/framework/plaindb/search.git
cd search
npm install
```

To run the tests:

```bash
npm test
```

## Contributing

Thank you! Please see our [contributing guidelines](/docs/contributing.md) for details.

## Donations

If you find this project useful and want to help support further development, please send us some coin. We greatly appreciate any and all contributions. Thank you!

**Bitcoin (BTC):**
```
1JUb1yNFH6wjGekRUW6Dfgyg4J4h6wKKdF
```

**Monero (XMR):**
```
46uV2fMZT3EWkBrGUgszJCcbqFqEvqrB4bZBJwsbx7yA8e2WBakXzJSUK8aqT4GoqERzbg4oKT2SiPeCgjzVH6VpSQ5y7KQ
```

## License

@basd/search is [MIT licensed](https://gitlab.com/frenware/framework/plaindb/search/-/blob/master/LICENSE).

