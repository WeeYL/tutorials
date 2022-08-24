
/* referencing */
let author = {
    name:'YL'
}
let course = {
    name:'nodeJS'
}

/* embedding */
let course = {
    author: {
        name:'YL'
    }
}

/* hybrid */
let author = {
    name:'YL',
    age:10
}

let course = {
    author:{
        id:'ref',
        name:'YL'
    }
}
