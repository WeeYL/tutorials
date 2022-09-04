// we have two interfaces called Song, with different properties:
interface Song {
    artistName: string;
  };
  
  interface Song {
    songName: string;
  };
  
  const song: Song = {
    artistName: "Freddie",
    songName: "The Chain"
  };

  console.log(song)

  // interface extends the class

  class Car {
    printCar = () => {
      console.log("this is my car")
    }
  };
  
  interface NewCar extends Car {
    name: string;
  };
  
  class NewestCar implements NewCar {
    maker: "Car";
    constructor(engine:string) {
      this.maker = maker
    }
    printCar = () => {
      console.log("this is my car")
    }
  };


  class shape {
    calcArea(){}
  }

  let square = new shape

  