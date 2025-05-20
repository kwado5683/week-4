import express from "express";
import dotenv from "dotenv";
import pg from "pg";

const app = express();

app.use(express.json());

app.listen(8080, function(){
    console.log("server is running on port 8080"); //opening a port for sever
});

app.get("/", function(request,response){
    response.json({message: "welcome to my "});
});


//=====================================================
//we need two packages to connect our database to our server
//pg --> we will use this to build a connection string pool and to send SQL queries to our database
//dotenv --> we will use this to store secrets in our server
//secrets --> sensitive data, passwords, encrypted data
//there are two secrets we want to store in our server:  the database password, and the database connection string



//to initialize dotenv

dotenv.config();

//creating the connection string pool and waiting area

const db = new pg.Pool({
    connectionString: process.env.DB_URL,
});

// console.log(db);



//=========================================================================================
//two methods used to build routes and two tasks assigned to them
// these methos have request and response parameters
//GET----> READ datafrom the database

app.get("/staff", async function(request,response){
    const query = await db.query(`SELECT * FROM staff;`);

    console.log(query); //this is a response object

    //now we parse the data to json and wrangle to get the requried reuslt
    const data = response.json(query.rows);

    

});



//POST --> CREATE new data in the database
app.post("/newstaff", function(request,response){
    //create a new entry in the staff table.
    const body = request.body;

    // a database query to create data into out table
    const query = db.query(
        `INSERT INTO staff ( staff_name, staff_location, staff_role, staff_salary)
        VALUES($1, $2, $3, $4)`), 
        [body.staff_name, body.staff_location, body.staff_role, body.staff_salary]
});