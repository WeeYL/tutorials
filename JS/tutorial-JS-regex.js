let txt
let pattern;

/* 
/pattern/modifiers;
g - global matching
i - insensitive matching
m - multiline matching

Metacharacter	
.	Find a single character, except newline or line terminator
\w	Find a word character
\W	Find a non-word character
\d	Find a digit
\D	Find a non-digit character
\s	Find a whitespace character
\S	Find a non-whitespace character
\b	Find a match at the beginning/end of a word, beginning like this: \bHI, end like this: HI\b
\B	Find a match, but not at the beginning/end of a word
\0	Find a NULL character
\n	Find a new line character
\f	Find a form feed character
\r	Find a carriage return character
\t	Find a tab character
\v	Find a vertical tab character
*/
_______Header______("quantifier")
/* 
n+	Matches any string that contains at least one n
n*	Matches any string that contains zero or more occurrences of n
n?	Matches any string that contains zero or one occurrences of n
n{X}	Matches any string that contains a sequence of X n's
n{X,Y}	Matches any string that contains a sequence of X to Y n's
n{X,}	Matches any string that contains a sequence of at least X n's
n$	Matches any string with n at the end of it
^n	Matches any string with n at the beginning of it
?=n	Matches any string that is followed by a specific string n
?!n	Matches any string that is not followed by a specific string n
 */

txt = "Hellooo Hello yellow plane";
pattern = /\w+o+\w+/g; // hello is not capture because not char after 'o'
console.log(txt.match(pattern))

pattern = /\w+o+\w*/g; 
console.log(txt.match(pattern))

txt = "1, 100, 1000,10000 or 1000000000";
pattern = /10?/g; 
console.log(txt.match(pattern))

pattern = /10{3}/g; 
console.log(txt.match(pattern))
pattern = /10{2,3}\d+/g; 
console.log(txt.match(pattern))


_______Header______("brackets")
/* 
[abc]	Find any character between the brackets
[^abc]	Find any character NOT between the brackets
[0-9]	Find any character between the brackets (any digit)
[^0-9]	Find any character NOT between the brackets (any non-digit)
(x|y)	Find any of the alternatives specified 
*/

txt = 
`try trying tried tries`

pattern = /tr[yi].*/gi 
console.log(txt.match(pattern)) // Any one character from a set of characters

pattern = /try/gi 
console.log(txt.match(pattern)) // A sequence of characters

pattern = /[^aeiou]/gi    // Any character not in a set of characters
console.log(txt.match(pattern)) 
  
// /[0-9]/     Any character in a range of characters
// /x+/        One or more occurrences of the pattern x
// /x+?/       One or more occurrences, nongreedy
// /x*/        Zero or more occurrences
// /x?/        Zero or one occurrence
// /x{2,4}/    Two to four occurrences
// /(abc)/     A group
// /a|b|c/     Any one of several patterns
// /\d/        Any digit character
// /\w/        An alphanumeric character (“word character”)
// /\s/        Any whitespace character
// /./         Any character except newlines
// /\b/        A word boundary
// /^/         Start of input
// /$/         End of input





// Header
function _______Header______(params) {
    params = params.toUpperCase();
    console.log(`--------------------${params}` );
  }