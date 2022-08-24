var express = require('express'); 
var app = express(); 
var PORT = 3000; 

// View engine setup 
app.set('view engine', 'ejs'); 

// With middleware 

// renders '/'
app.get('/', (req, res)=>{ 
	res.render('home') 
});

// renders '/user'
app.get('/user', (req, res,)=>{  
	res.render('user') 
}); 


app.listen(PORT, function(err){ 
	if (err) console.log(err); 
	console.log("Server listening on PORT", `http://localhost:${PORT}`); 
}); 
