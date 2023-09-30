## Classes

<dl>
<dt><a href="#SearchFactory">SearchFactory</a></dt>
<dd><p>SearchFactory Class</p>
</dd>
<dt><a href="#SearchInterpreter">SearchInterpreter</a></dt>
<dd></dd>
<dt><a href="#SearchInterpreter">SearchInterpreter</a></dt>
<dd></dd>
<dt><a href="#SearchNormalizer">SearchNormalizer</a></dt>
<dd></dd>
<dt><a href="#SearchParser">SearchParser</a></dt>
<dd></dd>
<dt><a href="#SearchParser">SearchParser</a></dt>
<dd></dd>
<dt><a href="#SearchTokenizer">SearchTokenizer</a></dt>
<dd></dd>
<dt><a href="#SearchTokenizer">SearchTokenizer</a></dt>
<dd></dd>
<dt><a href="#Search">Search</a></dt>
<dd></dd>
<dt><a href="#Search">Search</a></dt>
<dd></dd>
</dl>

<a name="SearchFactory"></a>

## SearchFactory
SearchFactory Class

**Kind**: global class  

* [SearchFactory](#SearchFactory)
    * [new SearchFactory(registry)](#new_SearchFactory_new)
    * [.createTokenizer()](#SearchFactory+createTokenizer) ⇒ [<code>SearchTokenizer</code>](#SearchTokenizer)
    * [.createParser()](#SearchFactory+createParser) ⇒ [<code>SearchParser</code>](#SearchParser)
    * [.createInterpreter()](#SearchFactory+createInterpreter) ⇒ [<code>SearchInterpreter</code>](#SearchInterpreter)

<a name="new_SearchFactory_new"></a>

### new SearchFactory(registry)

| Param | Type | Description |
| --- | --- | --- |
| registry | <code>Object</code> | The registry for storing class references |

<a name="SearchFactory+createTokenizer"></a>

### searchFactory.createTokenizer() ⇒ [<code>SearchTokenizer</code>](#SearchTokenizer)
Creates an instance of the SearchTokenizer class

**Kind**: instance method of [<code>SearchFactory</code>](#SearchFactory)  
**Returns**: [<code>SearchTokenizer</code>](#SearchTokenizer) - - Instance of SearchTokenizer  
<a name="SearchFactory+createParser"></a>

### searchFactory.createParser() ⇒ [<code>SearchParser</code>](#SearchParser)
Creates an instance of the SearchParser class

**Kind**: instance method of [<code>SearchFactory</code>](#SearchFactory)  
**Returns**: [<code>SearchParser</code>](#SearchParser) - - Instance of SearchParser  
<a name="SearchFactory+createInterpreter"></a>

### searchFactory.createInterpreter() ⇒ [<code>SearchInterpreter</code>](#SearchInterpreter)
Creates an instance of the SearchInterpreter class

**Kind**: instance method of [<code>SearchFactory</code>](#SearchFactory)  
**Returns**: [<code>SearchInterpreter</code>](#SearchInterpreter) - - Instance of SearchInterpreter  
<a name="SearchInterpreter"></a>

## SearchInterpreter
**Kind**: global class  

* [SearchInterpreter](#SearchInterpreter)
    * [new SearchInterpreter(ast)](#new_SearchInterpreter_new)
    * [.interpret(text)](#SearchInterpreter+interpret) ⇒ <code>boolean</code>

<a name="new_SearchInterpreter_new"></a>

### new SearchInterpreter(ast)

| Param | Type | Description |
| --- | --- | --- |
| ast | <code>Object</code> | The AST to interpret |

<a name="SearchInterpreter+interpret"></a>

### searchInterpreter.interpret(text) ⇒ <code>boolean</code>
Interprets the AST against a given text

**Kind**: instance method of [<code>SearchInterpreter</code>](#SearchInterpreter)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Text to search |

<a name="SearchInterpreter"></a>

## SearchInterpreter
**Kind**: global class  

* [SearchInterpreter](#SearchInterpreter)
    * [new SearchInterpreter(ast)](#new_SearchInterpreter_new)
    * [.interpret(text)](#SearchInterpreter+interpret) ⇒ <code>boolean</code>

<a name="new_SearchInterpreter_new"></a>

### new SearchInterpreter(ast)

| Param | Type | Description |
| --- | --- | --- |
| ast | <code>Object</code> | The AST to interpret |

<a name="SearchInterpreter+interpret"></a>

### searchInterpreter.interpret(text) ⇒ <code>boolean</code>
Interprets the AST against a given text

**Kind**: instance method of [<code>SearchInterpreter</code>](#SearchInterpreter)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Text to search |

<a name="SearchNormalizer"></a>

## SearchNormalizer
**Kind**: global class  
<a name="SearchNormalizer.normalize"></a>

### SearchNormalizer.normalize(text) ⇒ <code>string</code>
Normalizes a text string

**Kind**: static method of [<code>SearchNormalizer</code>](#SearchNormalizer)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Text to normalize |

<a name="SearchParser"></a>

## SearchParser
**Kind**: global class  

* [SearchParser](#SearchParser)
    * [new SearchParser(tokens)](#new_SearchParser_new)
    * [.parse()](#SearchParser+parse) ⇒ <code>Object</code>

<a name="new_SearchParser_new"></a>

### new SearchParser(tokens)

| Param | Type | Description |
| --- | --- | --- |
| tokens | <code>Array</code> | Tokens to parse |

<a name="SearchParser+parse"></a>

### searchParser.parse() ⇒ <code>Object</code>
Initiates the parsing process

**Kind**: instance method of [<code>SearchParser</code>](#SearchParser)  
**Returns**: <code>Object</code> - - AST  
<a name="SearchParser"></a>

## SearchParser
**Kind**: global class  

* [SearchParser](#SearchParser)
    * [new SearchParser(tokens)](#new_SearchParser_new)
    * [.parse()](#SearchParser+parse) ⇒ <code>Object</code>

<a name="new_SearchParser_new"></a>

### new SearchParser(tokens)

| Param | Type | Description |
| --- | --- | --- |
| tokens | <code>Array</code> | Tokens to parse |

<a name="SearchParser+parse"></a>

### searchParser.parse() ⇒ <code>Object</code>
Initiates the parsing process

**Kind**: instance method of [<code>SearchParser</code>](#SearchParser)  
**Returns**: <code>Object</code> - - AST  
<a name="SearchTokenizer"></a>

## SearchTokenizer
**Kind**: global class  
<a name="SearchTokenizer+tokenize"></a>

### searchTokenizer.tokenize(query) ⇒ <code>Array</code>
Tokenizes a query string

**Kind**: instance method of [<code>SearchTokenizer</code>](#SearchTokenizer)  
**Returns**: <code>Array</code> - - List of tokens  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | Query to tokenize |

<a name="SearchTokenizer"></a>

## SearchTokenizer
**Kind**: global class  
<a name="SearchTokenizer+tokenize"></a>

### searchTokenizer.tokenize(query) ⇒ <code>Array</code>
Tokenizes a query string

**Kind**: instance method of [<code>SearchTokenizer</code>](#SearchTokenizer)  
**Returns**: <code>Array</code> - - List of tokens  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | Query to tokenize |

<a name="Search"></a>

## Search
**Kind**: global class  

* [Search](#Search)
    * [new Search(opts)](#new_Search_new)
    * [.evaluator(needle)](#Search+evaluator) ⇒ <code>function</code>
    * [.evaluate(needle, haystack)](#Search+evaluate) ⇒ <code>boolean</code>

<a name="new_Search_new"></a>

### new Search(opts)

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Options for Search |

<a name="Search+evaluator"></a>

### search.evaluator(needle) ⇒ <code>function</code>
Creates an evaluator function based on the needle (query string)

**Kind**: instance method of [<code>Search</code>](#Search)  
**Returns**: <code>function</code> - - Evaluator function  

| Param | Type | Description |
| --- | --- | --- |
| needle | <code>string</code> | Query string |

<a name="Search+evaluate"></a>

### search.evaluate(needle, haystack) ⇒ <code>boolean</code>
Evaluates a query string against a text string

**Kind**: instance method of [<code>Search</code>](#Search)  
**Returns**: <code>boolean</code> - - True if the query matches, false otherwise  

| Param | Type | Description |
| --- | --- | --- |
| needle | <code>string</code> | Query string |
| haystack | <code>string</code> | Text string |

<a name="Search"></a>

## Search
**Kind**: global class  

* [Search](#Search)
    * [new Search(opts)](#new_Search_new)
    * [.evaluator(needle)](#Search+evaluator) ⇒ <code>function</code>
    * [.evaluate(needle, haystack)](#Search+evaluate) ⇒ <code>boolean</code>

<a name="new_Search_new"></a>

### new Search(opts)

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Options for Search |

<a name="Search+evaluator"></a>

### search.evaluator(needle) ⇒ <code>function</code>
Creates an evaluator function based on the needle (query string)

**Kind**: instance method of [<code>Search</code>](#Search)  
**Returns**: <code>function</code> - - Evaluator function  

| Param | Type | Description |
| --- | --- | --- |
| needle | <code>string</code> | Query string |

<a name="Search+evaluate"></a>

### search.evaluate(needle, haystack) ⇒ <code>boolean</code>
Evaluates a query string against a text string

**Kind**: instance method of [<code>Search</code>](#Search)  
**Returns**: <code>boolean</code> - - True if the query matches, false otherwise  

| Param | Type | Description |
| --- | --- | --- |
| needle | <code>string</code> | Query string |
| haystack | <code>string</code> | Text string |

