import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "./router.js"
const app = express()
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
app.use(express.static("public"))
app.use(cookieParser())
app.use("/chathub/api/v1/", router)





export { app }
