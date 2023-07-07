import fetch from "node-fetch"

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

const getNewPromisePokemonFullList = () => {
    const result = new Promise (async (res,rej)=>{
        const listResp = await fetch(url)
        const fullList = await listResp.json() 
        res( fullList)
    })
    return result
  }     

type C = Awaited<ReturnType<typeof getNewPromisePokemonFullList>>
async function myAsync(res:C){
    const result = await res
    return result
}

myAsync(getNewPromisePokemonFullList())
