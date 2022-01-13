// Requiring express and initializing tha app
const app = require('express')();
// Requiring the cors middleware
const cors = require('cors');
// Requiring the dotenv
require('dotenv').config();
// Require postgres dependency
const { Client } = require('pg');


const PORT = 5001; // Using port 5001

app.use(cors()); // Telling express to use the cors middleware

// Listen to get a request
app.get('/', async (req, res) => {
    // Creating a new client
    const client = new Client(); 
    // Connect to the database
    await client.connect(); 
    // Get data from database and store it in a variable
    // The string we pass to the client.query function is called SQL code
    // const deviceData = await client.query('SELECT * FROM devices');
    const audibleReadsData = await client.query('SELECT * FROM audible');
    // Sending the data to the client
    res.send(audibleReadsData.rows);
    // Closing the connection to the database
    await client.end();
});

// Listen to the port we chose above
app.listen(PORT, () => {
    // Print to the console that the server is listening
    console.log('Listening to port: ', PORT);
});
