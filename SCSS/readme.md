# SETUP
- Live Sass Compiler
    - Get from extension
    - click "watch Sass" from bottom of screen
    - create "dist" folder


# NOTE
- Partial files to be import to be named as _fileToImport. During import, just ignore underscore eg import fileToImport. 


# INFO
| INFO        |URL  |
| :---        |:----  |
| selectors |https://devhints.io/sass |
| functions | https://sass-lang.com/documentation/at-rules/function/ |
| playground | https://developer.mozilla.org/en-US/play |
# CHEATSHEET


| SCSS | ELEMENTS
| :---        |:----  |
| #{&} | get all parent #{&}__paragraph 
|  * | get name only eg &:hover
|  |
|  |

| SELECTOR | ELEMENTS
| :---        |:----  |
|* | all elements
| div | all div tags
| div,p | all divs and paragraphs
| p.intro | elements with class="intro"
| div p | paragraphs inside divs
| div > p | all p tags, one level deep in div
| div + p | p tags immediately after div
| div ~ p | p tags preceded by div
|.class1.class2 | Selects all elements with both name1 and name2
| #id  | Selects the element with id


| PSEUDO-CLASS | ELEMENTS
| :---        |:----  |
| a:link | link in normal state
| a:active | link in clicked state
| a:hover | link with mouse over it
| a:visited | visited link
| p::after{content:"yo";} | add content after p
| p::before add | content before p
| input:checked | checked inputs
| input:disabled | disabled inputs
| input:enabled | enabled inputs
| input:focus | input has focus
| input:in-range | value in range
| input:out-of-range | input value out of range
| input:valid | input with valid value
| input:invalid | input with invalid value
| input:optional | no required attribute
| input:required | input with requred attribute
| input:read-only | with readonly attribute
| input:read-write | no readonly attrib.
| div:empty | element with no children
| p::first-letter | first letter in p
| p::first-line | first line in p
| p:first-of-type | first of some type
| p:last-of-type | last of some type
| p:lang(en) | p with en language attribute
| :not(span) | element that's not a span
| p:first-child | first child of its parent
| p:last-child | last child of its parent
| p:nth-child(2) | second child of its parent
| p:nth-child(3n+1) | nth-child (an + b) formula
| p:nth-last-child(2) | second child from behind
| p:nth-of-type(2) | second p of its parent
| p:nth-last-of-type(2) | ...from behind
| p:only-of-type | unique of its parent
| p:only-child | only child of its parent
| :root | documents root element
| ::selection | portion selected by user
| :target | highlight active anchor