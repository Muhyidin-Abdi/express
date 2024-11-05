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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/musicians', async (req, res) => {
  try {
    // Retrieve musician details from the request body
    const { name, instrument } = req.body;

    // Validate that name and instrument fields are provided
    if (!name || !instrument) {
      return res.status(400).json({ error: "Name and instrument are required fields." });
    }

    // Create a new musician using Sequelize's create method
    const newMusician = await Musician.create({ name, instrument });

    // Send the created musician as a JSON response
    res.status(201).json(newMusician);
  } catch (error) {
    // Handle any potential errors
    console.error("Error creating musician:", error);
    res.status(500).json({ error: 'An error occurred while creating the musician.' });
  }
});

app.delete("/musicians/:id",async(req,res)=>{
  // get prams id 
  try{
     const musicianId = req.params.id;
    const destoryMusiciainByID = await Musician.destroy({where:{id:musicianId}})

    if(destoryMusiciainByID === 0 ){
      return res.status(404).json({ error: "Musician not found" });
    }

    res.status(200).json({ message: "Musician deleted successfully" });


  } catch(error) {
    // Handle any potential errors
    console.error("Error creating musician:", error);
    res.status(500).json({ error: 'An error occurred while creating the musician.' });
  }

})

app.put('/musicians/:id', async (req, res) => {
  try {
    // Retrieve musician parameters
    const musicianId = req.params.id;

    // Extract updated musician data from the request body
    const { name, instrument } = req.body;

    // Validating
    if (!name || !instrument) {
      return res.status(400).json({ error: "Name and instrument are required fields." });
    }

    // Find by ID
    const musician = await Musician.findByPk(musicianId);

    // Check if exists
    if (!musician) {
      return res.status(404).json({ error: "Musician not found" });
    }

    // Update the musician's details
    musician.name = name;
    musician.instrument = instrument;

    // Save to the database
    await musician.save();

    // Send the updated musician as a JSON response
    res.status(200).json(musician);
  } catch (error) {
    // Handle any potential errors
    console.error("Error updating musician:", error);
    res.status(500).json({ error: "An error occurred while updating the musician" });
  }
});

module.exports = app;