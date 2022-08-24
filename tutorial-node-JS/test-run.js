const { E } = require("./test-file");
const e = new E();
e.addListener("display", (arg) => {
  console.log(arg*arg);
});

e.display(2);
