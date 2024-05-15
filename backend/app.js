'use strict'; //no silly javascript errors

//require dependencies
const express = require('express'); //express library performs server functionality for us
const cors = require('cors'); //cors control our app's security
const { MongoClient } = require('mongodb'); //import the client from the mongodb library
require('dotenv').config(); //configure .env usage
require('mongoose');

//create express app
const app = express(); //express app
app.use(cors()); //default cors security enabled - local app calls are allowed, aka Our local frontend can call our local backend
app.use(express.json()); //allows ability to parse incoming JSON 

//define variables
const URI = process.env.ConnectionString; //connection string to local mongodb server
const client = new MongoClient(URI); //handles db connection
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct
const Note = require('./Schema.js')
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct
// be sure to make sure the schema is correct


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

// this is the entire GET route, for retrieving notes
// this will run when user logs in, userID will be generated(assigned?) by Auth0 and sent to backend(here)

//wrap db calls within a function. 
//This helps keeps the process nice and neat and makes it easier to avoid ongoing/lingering connections
async function getNotes(userID) {
    try {
        await client.connect(); //connect to db
        const database = client.db('NoteDB'); //checks for Database named NoteDB
        const collection = database.collection(userID); //checks for collection within NoteDB with a name equal to userID
        // const query = {}; create a variable holding the object / query you're searching for
        // if we can't figure this out, worst case we put all notes into one giant Collection and query userID here
        const result = await collection.find().toArray(); //await your async db query and store the result in a variable for use later
        console.log(result); //log to the console if you want
        return result; //this returns a value when the function is called
    } catch(e) {
        console.error(e);
    } finally {
        await client.close(); //using try, catch, finally is BEST practice.
        //Always close your collection after you've used it. OR ELSE
    }
}

//configure a route to the base url

app.get('/GET', async (req, res) => {
    notesArray = req.body // make sure this is JSON
    userID = notesArray[0].userID // Obtain userID from request
    try {
        const notes = await getNotes(userID);
        res.send(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching notes');
    }
});
// app.get('/GET', async (req, res) => {
//     res.send(await getNotes(userID));
//     //userID here has to check data given from frontend, check for userID and throw it into the function as a variable
    
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// i hope you're having a lovely day :3
//i am thank you :~>

function parseNotes(body) {
    return body.notes; 
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// this function should try to go to the Collection named NoteDB
// then the database with a name equal to the userID
// could just take this routing from the function above or figure out how to do it in the URL itself
async function saveNotes(userID, notes) {
    try {
        // await mongoose.connect(URI);
        // const NoteModel = mongoose.model(userID, Note); // Create model based on userID
        // await NoteModel.insertMany(notes); // Save notes to database
        // console.log('Notes saved');


        console.log(URI + '/' + userID)
        await mongoose.connect(URI + '/' + userID);
        const person = new Note({ title: Squid.title, id: Squid.id , category: Squid.category , description: Squid.description , date: Squid.Date , completed: Squid.Boolean , });
        // new Note({}) is a function taking the Schema specified in Schema.js
        // when you pull the data from frontend make sure the data matches the schema
        // and then figure out if new Note({}) already runs through the full array or if you gotta get fancy with it
        await person.save().then(() => console.log('notes saved'));
    } catch(e) {
        console.error(e);
        throw e;
    } finally {
        await mongoose.disconnect();
    }
}

app.post('/POST', async (req, res) => {
    const { userID} = req.body;
  try {
    const parseNotes = parseNotes(req.body)
    // this will return a proper array with the notes, might not need to be a whole function
    // this function doesn't exist yet
    await saveNotes(userID, parseNotes) // figure out how to go through a whole array and fit it into a proper schema
    // worst case: every note is parsed (fit into Mongo/Mongoose Schema) individually, then added to a new array (yet to be created), this array is then sent to mongo?
    // ideally: Schema syntax will already go through full array, or there is a seperate function for it, OR we can create a for loop/map every part of the array
    res.send('Notes Saved To Cloud');
  } catch (e) {
    console.log(e);
    res.send('Error Saving Notes'); 
  }
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//start the server
app.listen(3000, ()=> {
    console.log('App running on: '+'http://localhost:3000/GET');
})