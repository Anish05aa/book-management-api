import dotenv from "dotenv"
import app from "./app"
import connectDB from "./db"

dotenv.config({ path: "./.env" })

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("Mongo DB connection failed!", err)
  })
