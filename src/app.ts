import express, { Request, Response } from "express"
import morgan from "morgan"
import bookRoutes from "./routes/book.routes"

const app = express()

app.use(express.json())
app.use(morgan("dev"))

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "api is running" })
})

app.use("/api/v1/books",bookRoutes)

export default app
