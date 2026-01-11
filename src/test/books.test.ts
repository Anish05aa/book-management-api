import request from "supertest"
import app from "../app"

describe("Health check", () => {
  it("GET / should return api is running", async () => {
    const res = await request(app).get("/")

    expect(res.status).toBe(200)
    expect(res.body.message).toBe("api is running")
  })
})
