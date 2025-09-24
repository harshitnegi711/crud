import dotenv from "dotenv"
dotenv.config({ path: "./.env" })

import connectDB from "./db/index.js";
import { app } from "./app.js";




connectDB()       /*   connectDB returns a promise  */
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`app is listing at port :-> ${process.env.PORT}`)
    })
  }
  )
  .catch((err) => {
    console.log("MongoDB connection failed ----> ", err)
  })












/*
import express from "express"
const app = express()
( async () => {            TODO: its an ifi method for connenting database.
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/


