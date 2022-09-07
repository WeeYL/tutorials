import fetch from "node-fetch"
import { resolve } from "path";
import {_______Header______} from './utils'

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
//       .then(res => (res.json())) 
//       .then(data => { console.log(data['results'][5])
//       })

// ############# GET FULL LIST

const getFullPokemon_List = async()=>{
      const listResp = await fetch(url)
      const data = await listResp.json()
      console.log (data) // console log within the function to see result
}

// ############# SEPARATE GET FULL LIST INTO 2 PARTS

const getPokemonFullList = async():Promise<Pokemon> => {
      const listResp = await fetch(url)
      const fullList = await listResp.json() 
      return fullList
}     

const getPokemonFromUrl = async(url:string):Promise<Pokemon> =>{
      const dataResp = await fetch (url)
      return await dataResp.json()
}

const getFirstPokemon = async ():Promise<Pokemon> => new Promise (async (resolve,reject)=>{
      try {
            const list = await getPokemonFullList()
            resolve (await getPokemonFromUrl(list.results[0].url))
            
      } catch (error) {
            console.error(error)
      }
})


async function returnFirstPokemon (){
      try {
            const result = await getFirstPokemon()
            console.log(result)
      } catch (error) {
            console.error(error)
      }
}
// ############# Loop

async function pokemonLoop () {
      const list = await getPokemonFullList()
      for (const item of list.results) {
            console.log(item.url)
      }
}


// ############# Runs
// basicTest
// getFullPokemon_List()
// returnFirstPokemon()
pokemonLoop()