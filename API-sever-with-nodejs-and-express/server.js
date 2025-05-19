import express from "express";

const app = express();

//creating a port for our route
app.listen(3000,function(){
    console.log("Server is listening on port 3000")
});

//to set up the GET route
app.get("/message", function(request,response){
    response.json({message: "Hello, World!"});
    
});

app.get("/users", function(request,response){
    response.json({name: "ani"});

});

///practice on post later