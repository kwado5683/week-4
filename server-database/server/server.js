import pg from "pg";
import dotenv from "dotenv";
import express from "express";

//package configuration
const app = express();
app.use(express.json());




//activate dotenv
dotenv.config()

//create a connection to the database
const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});



//server configuration

app.listen(8080, function(){
    console.log( "server is running on port 8080")
})

//create a root route 
app.get("/",function(request,response){
    response.json({message:"welcome to my server, this is our root route"});

});


// create a GET route

app.get(`/messages`, async function(request,response){
    const query = await db.query( `SELECT * FROM messages;`);
    const data = response.json(query.rows);

});

//create a route for inserting post to the database

app.post("/messages",async function(request,response){
    const body = request.body;
    // console.log(body);
    const query = await db.query(
        `INSERT INTO messages(message_name, content),
        VALUES ($1, $2)`[
            body.message_name, body.content
        ]);
});