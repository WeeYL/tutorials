import fetch from "node-fetch"
const header = require("../../../")

const url = "https://pokeapi.co/api/v2/pokemon/"
interface Pokemon {
      count: number;
      next: string;
      previous?: any;
      results: {
        name: string;
        url: string;
      }[];
    }

// ############# Basic 

// const basicTest = fetch(url)
//       .then(res => res.json()) 
//       .then(data => console.log(data['results'][5]))
//       .catch(err=> console.log(err))

// ############# GET FULL LIST

const getFullPokemonList_exe = async()=>{
      const listResp = await fetch(url)
      const fullList = await listResp.json() 
      console.log (fullList) // console log the json within the function to see result
}

// ############# SEPARATE GET FULL LIST INTO 2 PARTS

// A promise of full list
const getPokemonFullList = async():Promise<Pokemon> => {
      const listResp = await fetch(url)
      const fullList = await listResp.json() 
      return fullList
}     

// promise of pokemon based on URL
const getPokemonFromUrl = async(url:string):Promise<Pokemon> =>{
      const dataResp = await fetch (url)
      return await dataResp.json()
}

// creates a new promise to resolve and reject



// function to run getFirstPokemon()
async function returnFirstPokemon (){
      try {
            const result = await getFirstPokemon()
            console.log(result)
      } catch (error) {
            console.error(error)
      }
}


// ############# create promise

const getNewPromisePokemonFullList = () => {
      const result = new Promise (async (res,rej)=>{
            const listResp = await fetch(url)
            const fullList = await listResp.json() 
            res( fullList)
      })
      return result
}    


const getFirstPokemon = async ():Promise<Pokemon> => new Promise (async (resolve,reject)=>{
      try {
            const list = await getPokemonFullList()
            resolve (await getPokemonFromUrl(list.results[0].url))
            
      } catch (error) {
            console.error(error)
      }
})


// ### TESTBED
  async function testBed() {
      // const res = await getPokemonFullList()
      const res = await getNewPromisePokemonFullList()
      // const res = await returnFirstPokemon()
      // const res = await pokemonLoop()
      // const res = await newPromise ()
      // const res = await newPromiseGetFirstPokemon ()
      console.log( res)
  }

  // ### RUN
  testBed()
//   getFullPokemonList_exe()
