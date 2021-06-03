import express, { Application } from 'express'
const PORT = process.env.PORT || 8080
const app: Application = express()
app.listen(PORT, () => console.log('express is running on port', PORT))