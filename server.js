// Dependencies
const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()
const PORT = process.env.PORT || 3000;

// Global Variables
let theNotes = [];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

// Routes
app.get("/api/notes", function(res) {
    try {

        theNotes = fs.readFileSync("./db/db.json", "utf8");

        theNotes = JSON.parse(theNotes);


    } catch (err) {
        throw err;
    }
    res.json(theNotes);
});

app.post("/api/notes", function(req, res) {
    try {

        theNotes = fs.readFileSync("./db/db.json", "utf8");
        theNotes = JSON.parse(theNotes);
        req.body.id = (theNotes.length + 1);
        theNotes.push(req.body)
        theNotes = JSON.stringify(theNotes);
        fs.writeFile("./db/db.json", theNotes, "utf8", function(err) {   
            if (err) throw err;
        });
        res.json(JSON.parse(theNotes));
    } catch (err) {
        throw err;
    }
});


app.get("/notes", function(res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/api/notes", function(res) {
    return res.sendFile(path.json(__dirname, "./db/db.json"));
});
app.listen(PORT, function() {
    console.log("I'm listening on port " + PORT);
});