const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.get('/musicians', async (req, res) => {
  try {
  const musicians = await Musician.findAll();
   res.json(musicians);
  } catch (error) {       
    console.error("Error fetching musicians:", error);
    res.status(500).json({ error: 'An error occurred while retrieving musicians.' });
  }
});

app.get('/musicians/:id', async (req, res) => {
  try {
   
    const musicianId = req.params.id;

  
    const musician = await Musician.findByPk(musicianId);

    if (!musician) {
      return res.status(404).json({ error: "Musician not found" });
    }
    res.json(musician);
  } catch (error) {
    // Handle any potential errors and send a 500 status with an error message
    console.error("Error fetching musician:", error);
    res.status(500).json({ error: 'An error occurred while retrieving the musician.' });
  }
});




module.exports = app;