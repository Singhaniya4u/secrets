//The password is pleaseopen

import express from 'express';
import bodyParser from "body-parser";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));

var userIsAuthorised = false;

function passwordCheck(req, res, next){
    const password = req.body["password"];
    if(password === "pleaseopen"){
        userIsAuthorised = true;        
    }
    next();
} 
app.use(passwordCheck);

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/public/index.html");                          // path to root directory                        // path to root directory
});

app.post("/check", (req, res) =>{
    if(userIsAuthorised){
        res.sendFile(__dirname + "/public/secret.html");
    }
    else{
        res.sendFile(__dirname + "/public/index.html");
        // alternatively res.redirect("/");
    }
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});
