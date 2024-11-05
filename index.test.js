// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
   test("it should respond with a 200",async()=>{
    const respond = await request(app).get("/musician");
    expect(respond.statusCode).toBe(200)
   })

})
