export function printHeader(header) { 
    console.log("\n\n------------------------------")

    console.log(header);
    console.log("------------------------------\n")

};

export function pph(header) { 

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

export function ppf(...args) {

    const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );

    const keyLst = arrayRange (0, args.length-1, 2)

    for (let n of keyLst) {
        console.log(`${args[n]}: `,args[n+1]);
    }
}

export function pwh (value) {
    const container = document.getElementById("container")
    // container.innerHTML=""
    let div = document.createElement('h4')
    container.appendChild(div)
    div.innerHTML = value
}
export function ppw (...args) {
    
    const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );

    const keyLst = arrayRange (0, args.length-1, 2)

    const container = document.getElementById("container")

    for (let n of keyLst) {
        let div = document.createElement('div')
        container.appendChild(div)
        // div.innerHTML = `<span style="color:red;>${args[n]}</span> <span>${args[n+1]} </span> `
        div.innerHTML = `<span style="color:red;">${args[n]}:</span> <span>${args[n+1]} </span> `

    }

    container.removeChild(container.firstChild)
}

