// UNION
function orders(id: string | number) {console.log(`union: ${id}`)}

orders("10")
orders("ten")

//INTERSECTION
interface playerInfo {name:string}
interface club {club:string}
function transfer(player:playerInfo & club) {
    console.log(`intersection ${player.name} ${player.club}`)
}
transfer({name:"john",club:"club FC"})

// KEYOF 
// update a assigned const value
interface Menu {drinks:string}
const originalMenu: Menu = {drinks:"coke"}
console.log(`keyof original menu:${originalMenu.drinks}`)
function adjustMenu(menu:Menu, newEntry:keyof Menu, change:string) {
    menu[newEntry] = change
}

adjustMenu(originalMenu,"drinks","beer")
console.log(`keyof adjusted original menu:${originalMenu.drinks}`)

// TYPEOF
// get the ReturnType from a function

function character (){
    return {name:"john", id:100}
}

type Character = ReturnType<typeof character>
const newChar:Character = {name:"paul", id:12}
console.log(`ReturnType typeof: ${newChar.name} ${newChar.id}`)

// PARTIAL TYPE 
// makes any interface as optional
interface Movie {name: string, id:number, }

function getMovieName (movie: Partial <Movie>) {
    console.log(`Partial ${movie.name}`)
}
getMovieName({name:"my movie"})

// Required TYPE 
// makes any interface as required
interface MovieCast {name?: string, film?: string }

function getMovieCast (movie: Required <MovieCast>) {
    console.log(`Required ${movie.name}`)
}
getMovieCast({name:"john", film:"my film"})

// EXTRACT
// extract the interface and the type that should be extract

type MovieCharacter = "HARRY"| "POTTER" | {firstname: string, lastname:string}
type StringOnlyChar = Extract<MovieCharacter, string>
const mychar:StringOnlyChar = "HARRY" // only string
type ObjOnlyChar = Extract<MovieCharacter, {firstname: string}>
const mycharObj:ObjOnlyChar = {firstname:"h",lastname:"l"} // only string object

// EXCLUDE
type ExcludeObj = Exclude<StringOnlyChar,ObjOnlyChar>
const excludeExcludeObj:ExcludeObj = "HARRY"

// MAPPED
// changed exisitnng interface function return type to one type 
interface PlayMovies {
    playFantasyMovie:()=>number,
    paid:string
}

type ToFlag<T> = {[Property in keyof T]: boolean}

type PlayMovieFlag = ToFlag<PlayMovies>
const playMyMovies:PlayMovieFlag = {playFantasyMovie:false,paid:true}
console.log(`MAPPED ${playMyMovies.playFantasyMovie} ${playMyMovies.paid}`)