export function printHeader(header) { 
    console.log("\n\n------------------------------")

    console.log(header);
    console.log("------------------------------\n")

};

export function printUCHeader(header) { 

    console.log("\n\n#----------------------------#")
    console.log(header.toUpperCase());
    console.log("#----------------------------#\n")

};


export function ppp(...args) {
    
    const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );

    const keyLst = arrayRange (0, args.length-1, 2)

    for (let n of keyLst) {
        console.log(`${args[n]}: ${args[n+1]} `);
    }
}

