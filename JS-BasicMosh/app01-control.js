import { printHeader} from "../JS-helper/printHeader.js";

export const nameList = [
  {
      "name": "John",
      "gender": "Male",
      "age": 30
  },
  {
      "name": "Jane",
      "gender": "Female",
      "age": 25
  },
  {
      "name": "Tommy",
      "gender": "Non-binary",
      "age": 28
  }
]

printHeader("Loop let-in");

for (let index in nameList) {
    console.log(index, nameList[index])
}

printHeader("Loop let-of");

for (let k of nameList) {
    console.log(k)
}



