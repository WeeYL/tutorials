// What Does Abstraction Mean in OOP?
// Abstraction means hiding certain details that don't matter to the user and only showing essential features or functions.
// For example, take a cell phone. We don't show details like verifyTemperature(), verifyVolt(), frontCamOn(), frontCamOff() and so on. Instead we provide essential features which matter to user like camera(), volumeBtn(), and others.

// What Does Encapsulation Mean in OOP?
// Encapsulation means keeping properties and methods private inside a class, so that they are not accessible from outside that class.
// This will keep code that's outside the class from accidentally manipulating internal methods and properties.

// What Does Inheritance Mean in OOP?
// Inheritance makes all properties and methods available to a child class. This allows us to reuse common logic and to model real-world relationships. We will discuss inheritance in further section of this article with pratical example.

// What Does Polymorphism Mean in OOP?
// Polymorphism means having different and many forms. We can overwrite a method inherited from a parent class.

// Encapsulation example
class Person {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
  add_Address(add) {
    this.add = add;
  }
  getDetails() {
    console.log(`Name is ${this.name}, Address is: ${this.add}`);
  }

  abstraction() {
    let name = this.name;
    let add = this.add;
    let getDetails_noaccess = function () {
      return `name is: ${name} address is: ${add}`;
    };
    console.log(getDetails_noaccess());

  }
}

let person1 = new Person("Mukul", 21);
person1.add_Address("Delhi");
person1.getDetails();
person1.abstraction("first", "last");
console.log(person1.abstraction.getDetails_noaccess); // returns undefined

// // Abstraction example
// function abstraction(fname, lname) {
//     let firstname = fname;
//     let lastname = lname;

//     let getDetails_noaccess = function () {
//         return (`First name is: ${firstname} Last
//             name is: ${lastname}`);
//     }

//     this.getDetails_access = function () {
//         return (`First name is: ${firstname}, Last
//             name is: ${lastname}`);
//     }
// }
// let person2 = new abstraction('Mukul', 'Latiyan');
// console.log(person2.firstname);
// console.log(person2.getDetails_noaccess);
// console.log(person2.getDetails_access());
